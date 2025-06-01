import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { services } from '../config';

const router = express.Router();

router.use('/api/users', createProxyMiddleware({ target: services.user, changeOrigin: true }));
router.use('/api/recipe', createProxyMiddleware({ target: services.recipe, changeOrigin: true }));
router.use('/api/files', createProxyMiddleware({ target: services.file, changeOrigin: true }));
router.use('/api/articles', createProxyMiddleware({ target: services.article, changeOrigin: true }));
router.use('/api/preference', createProxyMiddleware({ target: services.preference, changeOrigin: true }));
router.use('/api/feedback', createProxyMiddleware({ target: services.feedback, changeOrigin: true }));

export default router;