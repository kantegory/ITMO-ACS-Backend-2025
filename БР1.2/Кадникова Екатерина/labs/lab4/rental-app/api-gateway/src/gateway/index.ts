import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import SETTINGS from '../config/settings';

function createProxy(target: string) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
        onError: (err, req, res) => {
            console.error(err);
            if (!res.headersSent) {
                res.status(502).json({ error: 'Bad gateway', details: err.message });
            }
        },
        onProxyReq: (proxyReq, req) => {
            if (req.body) {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }
        }
    });
}

export function setupProxy(app: Express) {
    app.use('/auth', createProxy(SETTINGS.AUTH_SERVICE_URL));

    app.use('/users', createProxy(SETTINGS.USER_SERVICE_URL));

    app.use('/properties', createProxy(SETTINGS.PROPERTY_SERVICE_URL));
    app.use('/favorites', createProxy(SETTINGS.PROPERTY_SERVICE_URL));

    app.use('/messages', createProxy(SETTINGS.CHAT_SERVICE_URL));

    app.use('/rentals', createProxy(SETTINGS.RENTAL_SERVICE_URL));
}