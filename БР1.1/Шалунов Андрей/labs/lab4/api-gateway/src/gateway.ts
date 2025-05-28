import { Express } from 'express';
import proxy from 'express-http-proxy';
import SETTINGS from './config/settings';

function createProxy(target: string) {
    return proxy(target, {
        proxyErrorHandler: (err, res) => {
        console.error(err);
        if (!res.headersSent) {
            res.status(502).json({ error: 'Bad gateway', details: err.message });
        }
        },
        proxyReqPathResolver: (req) => req.originalUrl,
    });
}

export function setupProxy(app: Express) {
    app.use('/api/auth', createProxy(SETTINGS.AUTH_SERVICE_URL));
    app.use('/api/users', createProxy(SETTINGS.USER_SERVICE_URL));
    app.use('/api/properties', createProxy(SETTINGS.PROPERTY_SERVICE_URL));
    app.use('/api/photos', createProxy(SETTINGS.PHOTO_SERVICE_URL));
    app.use('/api/bookings', createProxy(SETTINGS.BOOKING_SERVICE_URL));
    app.use('/api/messages', createProxy(SETTINGS.MESSAGE_SERVICE_URL));
}