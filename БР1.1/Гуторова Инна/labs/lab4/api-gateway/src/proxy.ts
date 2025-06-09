import http from 'http';
import https from 'https';
import { Request, Response, RequestHandler } from 'express';
import { parse } from 'url';
import { SERVICE_URLS } from './config';
import { IncomingMessage, ClientRequest } from 'http';

interface ExtendedRequest extends Request {
  proxyTarget?: string;
}

const PROXY_TIMEOUT = 10000;
const PROXY_AGENT_SETTINGS = {
  keepAlive: true,
  maxSockets: 100,
};

const httpAgent = new http.Agent(PROXY_AGENT_SETTINGS);
const httpsAgent = new https.Agent(PROXY_AGENT_SETTINGS);

const getAgent = (url: string) => url.startsWith('https') ? httpsAgent : httpAgent;

const forwardRequest = (req: ExtendedRequest, res: Response, targetUrl: string): void => {
  const parsedTarget = parse(targetUrl);
  const isHttps = parsedTarget.protocol === 'https:';

  const options = {
    hostname: parsedTarget.hostname,
    port: parsedTarget.port || (isHttps ? 443 : 80),
    path: req.originalUrl,
    method: req.method,
    headers: {
      ...req.headers,
      host: parsedTarget.hostname || '',
      'x-forwarded-for': req.ip,
      'x-forwarded-host': req.get('host') || '',
      'x-forwarded-proto': req.protocol,
    },
    agent: getAgent(targetUrl),
    timeout: PROXY_TIMEOUT,
  };

  if (req.method === 'GET' || req.method === 'HEAD') {
    delete options.headers['content-length'];
    delete options.headers['content-type'];
  }

  const proxyReq = (isHttps ? https : http).request(options, (proxyRes: IncomingMessage) => {
    proxyRes.headers['x-proxy-server'] = 'api-gateway';

    res.status(proxyRes.statusCode || 500);

    Object.keys(proxyRes.headers).forEach(key => {
      const value = proxyRes.headers[key];
      if (value) {
        res.setHeader(key, value);
      }
    });
    
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`Proxy error for ${req.method} ${req.originalUrl}:`, err);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Bad Gateway', message: 'Service unavailable' });
    }
  });

  proxyReq.on('timeout', () => {
    console.error(`Proxy timeout for ${req.method} ${req.originalUrl}`);
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ error: 'Gateway Timeout', message: 'Service did not respond in time' });
    }
  });

  if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const bodyData = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }

  req.pipe(proxyReq);
};

const createServiceProxy = (serviceUrl: string, pathPrefix: string): RequestHandler => {
  return (req: ExtendedRequest, res: Response) => {
    req.proxyTarget = serviceUrl;

    forwardRequest(req, res, serviceUrl);
  };
};

export const proxies: Record<string, RequestHandler> = {
  '/api/auth': createServiceProxy(SERVICE_URLS.USER_SERVICE, '/api/auth'),
  '/api/users': createServiceProxy(SERVICE_URLS.USER_SERVICE, '/api/users'),
  '/api/attractions': createServiceProxy(SERVICE_URLS.TRAVEL_SERVICE, '/api/attractions'),
  '/api/media': createServiceProxy(SERVICE_URLS.TRAVEL_SERVICE, '/api/media'),
  '/api/routes': createServiceProxy(SERVICE_URLS.TRAVEL_SERVICE, '/api/routes'),
  '/api/travel-types': createServiceProxy(SERVICE_URLS.TRAVEL_SERVICE, '/api/travel-types'),
  '/api/trips': createServiceProxy(SERVICE_URLS.TRAVEL_SERVICE, '/api/trips'),
  '/api/bookings': createServiceProxy(SERVICE_URLS.BOOKING_SERVICE, '/api/bookings'),
  '/api/favorite': createServiceProxy(SERVICE_URLS.BOOKING_SERVICE, '/api/favorite')
};