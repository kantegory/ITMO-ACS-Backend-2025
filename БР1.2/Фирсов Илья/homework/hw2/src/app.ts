import 'reflect-metadata';

import express, {
    Application,
    ErrorRequestHandler,
} from 'express';
import cors from 'cors';

import SETTINGS from './config/settings';
import dataSource from './config/data-source';
import { RegisterRoutes } from './routes';
import { useSwagger } from './common/swagger';

export class App {
    public readonly app: Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddleware(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private configureRoutes(): void {
        useSwagger(this.app);

        RegisterRoutes(this.app);
    }

    private configureErrorHandling(): void {
        const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
            if (err && (err as any).status && (err as any).fields) {
                const e = err as any;
                res.status(e.status).json({ message: e.message, details: e.fields });
            }
            else if (err instanceof Error) {
                console.error(err);
                res.status(500).json({ message: err.message });
            }
            else {
                next();
            }
        };

        this.app.use(errorHandler);
    }

    public async start(): Promise<void> {
        await dataSource.initialize();
        this.app.listen(SETTINGS.APP_PORT, SETTINGS.APP_HOST, () => {
            console.log(
                `🔗 Server running at ${SETTINGS.APP_PROTOCOL}://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}`
            );
        });
    }
}
