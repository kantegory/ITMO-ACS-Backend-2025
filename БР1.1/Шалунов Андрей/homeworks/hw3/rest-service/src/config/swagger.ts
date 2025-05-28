import { Application } from 'express';
import {
    getMetadataArgsStorage,
    RoutingControllersOptions,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import SETTINGS from './settings';

export function useSwagger(
    app: Application,
    options: RoutingControllersOptions,
): Application {
    try {
        const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/definitions/',
        });

        const storage = getMetadataArgsStorage();

        const spec = routingControllersToSpec(storage, options, {
        components: {
            schemas,
            securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            },
        },
        security: [
            { bearerAuth: [] }
        ],
        info: {
            title: 'RealEstate API',
            description: 'Автодокументация REST API для проекта RealEstate',
            version: '1.0.0',
        },
        servers: [
            {
            url: `${SETTINGS.APP_PROTOCOL}://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}`,
            },
        ],
        });

        app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
        app.get('/docs.json', (_req, res) => {
        res.json(spec);
        });

        return app;
    } catch (error) {
        console.error('Ошибка настройки Swagger:', error);
        return app;
  }
}