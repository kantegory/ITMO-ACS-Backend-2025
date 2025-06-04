import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';

import SETTINGS from './config/settings';
import dataSource from './config/data-source';
import { useSwagger } from './swagger';
import { bootstrap, createRepositories, createServices } from './bootstrap';
import { AuthController } from './presentation/expressjs/controllers/auth.controller';
import { TrainingController } from './presentation/expressjs/controllers/training.controller';
import { WeaponTypeController } from './presentation/expressjs/controllers/weapon-type.controller';
import { createRoutes } from './presentation/expressjs/routes';

class App {
    public port: number;
    public host: string;
    public protocol: string;
    public controllersPath: string;
    private services: any;

    private app: express.Application;

    constructor(
        port = SETTINGS.APP_PORT,
        host = SETTINGS.APP_HOST,
        protocol = SETTINGS.APP_PROTOCOL,
        controllersPath = SETTINGS.APP_CONTROLLERS_PATH,
    ) {
        this.port = port;
        this.host = host;
        this.protocol = protocol;
        this.controllersPath = controllersPath;
        
        // Создаем продакшен-зависимости
        const repositories = createRepositories(dataSource);
        const services = createServices(repositories);
        const { services: prodServices } = bootstrap(repositories, services);
        this.services = prodServices;
        
        this.app = this.configureApp();
    }

    private configureApp(): express.Application {
        let app = express();

        // middlewares section
        app.use(cors());
        app.use(express.json());

        // Создаем контроллеры
        const authController = new AuthController(this.services.authService);
        const trainingController = new TrainingController(
            this.services.freeTrainingService,
            this.services.qualificationTrainingService
        );
        const weaponTypeController = new WeaponTypeController(this.services.weaponTypeService);

        // Регистрируем роуты
        app.use(SETTINGS.APP_API_PREFIX, createRoutes(
            authController,
            trainingController,
            weaponTypeController
        ));

        // Настраиваем Swagger
        app = useSwagger(app, {
            routePrefix: SETTINGS.APP_API_PREFIX,
            controllers: [
                AuthController,
                TrainingController,
                WeaponTypeController
            ],
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true
        });

        return app;
    }

    public start(): void {
        // establish database connection
        dataSource
            .initialize()
            .then(() => {
                console.log('Data Source был проинициализирован!');
            })
            .catch((err) => {
                console.error('Ошибка при инициализации Data Source:', err);
            });

        this.app.listen(this.port, this.host, () => {
            console.log(
                `Сервер работает на ${this.protocol}://${this.host}:${this.port}`,
            );
        });
    }
}

const app = new App();
app.start();

export default app;
