import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://localhost:3001';
const PROPERTIES_SERVICE_URL = process.env.PROPERTIES_SERVICE_URL || 'http://localhost:3002';
const CHATS_SERVICE_URL = process.env.CHATS_SERVICE_URL || 'http://localhost:3003';

app.get('/', (_req, res) => {
  res.send('API Gateway is running');
});

app.use('/api/users', createProxyMiddleware({
  target: USERS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/users/' },
}));

app.use('/api/properties', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/properties/' },
}));

app.use('/api/favorites', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/favorites/' },
}));

app.use('/api/booking-requests', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/booking-requests/' },
}));

app.use('/api/complaints', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/complaints/' },
}));

app.use('/api/property-images', createProxyMiddleware({
  target: PROPERTIES_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/property-images/' },
}));

app.use('/api/chats', createProxyMiddleware({
  target: CHATS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/': '/api/chats/' },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
