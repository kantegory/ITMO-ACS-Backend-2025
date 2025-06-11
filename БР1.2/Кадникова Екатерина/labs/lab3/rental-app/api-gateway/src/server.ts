import express from 'express';
import cors from 'cors';
import SETTINGS from './config/settings';
import { logMiddleware } from './middlewares/log.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { setupProxy } from './gateway';

async function start() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(logMiddleware);

    setupProxy(app);

    app.get('/health', (_req, res) => {
        res.json({ status: 'OK' });
    });

    app.use(errorMiddleware);

    app.listen(SETTINGS.PORT, () => {
        console.log(`API Gateway listening on http://localhost:${SETTINGS.PORT}`);
    });
}

start();