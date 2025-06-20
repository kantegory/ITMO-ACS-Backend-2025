import 'reflect-metadata';
import 'express-async-errors';

import express, { Application } from 'express';
import cors from 'cors';
import { useExpressServer, RoutingControllersOptions } from 'routing-controllers';

import SETTINGS from './config/settings';
import { AppDataSource } from './config/data-source';
import { useSwagger } from './config/swagger';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { PropertyController } from './controllers/property.controller';
import { BookingController } from './controllers/booking.controller';
import { MessageController } from './controllers/message.controller';
import { PhotoController } from './controllers/photo.controller';

import { authMiddleware } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';

class App {
    public port = SETTINGS.APP_PORT;
    public host = SETTINGS.APP_HOST;
    public protocol = SETTINGS.APP_PROTOCOL;
    private app: Application;

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure() {
        this.app.use(cors());
        this.app.use(express.json());

        const rcOptions: RoutingControllersOptions = {
        routePrefix: SETTINGS.APP_API_PREFIX,
        controllers: [
            AuthController,
            UserController,
            PropertyController,
            BookingController,
            MessageController,
            PhotoController,
        ],
        middlewares: [authMiddleware, errorHandler],
        defaultErrorHandler: false,
        validation: true,
        classTransformer: true,
        };

        useExpressServer(this.app, rcOptions);
        useSwagger(this.app, rcOptions);
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
            console.log(`Swagger UI: http://${this.host}:${this.port}/docs`);
        });
    }
}

new App().start();
