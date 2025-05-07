import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import SETTINGS from './config/settings';
import { AppDataSource } from './config/data-source';

import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import propertyRouter from './routes/property.router';
import bookingRouter from './routes/booking.router';
import messageRouter from './routes/message.router';
import photoRouter from './routes/photo.router';

import { errorHandler } from './middlewares/error.middleware';

class App {
    public port: number;
    public host: string;
    public protocol: string;
    private app: express.Application;

    constructor() {
        this.port = SETTINGS.APP_PORT;
        this.host = SETTINGS.APP_HOST;
        this.protocol = SETTINGS.APP_PROTOCOL;
        this.app = this.configureApp();
    }

    private configureApp(): express.Application {
        const app = express();

        app.use(cors());
        app.use(express.json());

        const prefix = SETTINGS.APP_API_PREFIX;
        app.use(`${prefix}/auth`, authRouter);
        app.use(`${prefix}/users`, userRouter);
        app.use(`${prefix}/properties`, propertyRouter);
        app.use(`${prefix}/bookings`, bookingRouter);
        app.use(`${prefix}/messages`, messageRouter);
        app.use(`${prefix}/property-photos`, photoRouter);

        app.use(errorHandler);

        return app;
    }

    public async start(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log('Data Source has been initialized!');
        } catch (err) {
            console.error('Error during Data Source initialization:', err);
            process.exit(1);
        }

        this.app.listen(this.port, this.host, () => {
            console.log(
                `Server running at ${this.protocol}://${this.host}:${this.port}${SETTINGS.APP_API_PREFIX}`
            );
        });
    }
}

new App().start();