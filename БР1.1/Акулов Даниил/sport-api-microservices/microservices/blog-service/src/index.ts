import 'reflect-metadata';
import express from "express";
import {dataSource} from "./config/dataSource";
import {errorHandler} from "./middleware/errorHandler";
import {SETTINGS} from "./config/settings";
import {RoutingControllersOptions, useExpressServer} from 'routing-controllers';
import { useSwagger } from './swagger';
import {authorizationChecker} from "./middleware/checkAuth";

class App {
    public port: number;
    public controllersPath: string;

    private app: express.Application;

    constructor(port = SETTINGS.API_PORT,
                controllersPath = SETTINGS.APP_CONTROLLERS_PATH) {
        this.port = port;
        this.controllersPath = controllersPath;
        this.app = this.configureApp();
    }

    private configureApp(): express.Application {
        let app = express();

        const options: RoutingControllersOptions = {
            routePrefix: SETTINGS.APP_API_PREFIX,
            controllers: [__dirname + this.controllersPath],
            cors: true,
            defaultErrorHandler: false,
            validation: {
                whitelist: true,
                forbidNonWhitelisted: true,
            },
            authorizationChecker,
        };

        app = useExpressServer(app, options);
        app = useSwagger(app, options);

        app.use(errorHandler);

        return app;
    }

    public start(): void {
        dataSource
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!');
                this.app.listen(this.port, () => {
                    console.log(
                        `🚀 Server running at http://localhost:${this.port}`,
                    );
                });
            })
            .catch((err) => {
                console.error('Error during Data Source initialization:', err);
            });
    }
}

const app = new App();
app.start();

export default app;