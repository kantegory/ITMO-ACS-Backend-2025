import { Express } from 'express';
import { getMetadataArgsStorage, RoutingControllersOptions} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export function useSwagger(app: Express, options: RoutingControllersOptions): Express {
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
            info: {
                title: 'Rent service',
                description: 'API documentation for rent service of the rent system',
                version: '1.0.0',
            },
            security: [{ bearerAuth: [] }]
        });
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
        return app;
    } catch (error) {
        console.error('Swagger set up error:', error);
        return app;
    }
}
