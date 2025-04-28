import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import rawDocument from '../../swagger.json';
import SETTINGS from '../config/settings';

export function useSwagger(app: Application): void {
    const spec = JSON.parse(JSON.stringify(rawDocument));
    spec.info = {
        title:       SETTINGS.APP_NAME,
        version:     SETTINGS.APP_VERSION,
        description: SETTINGS.APP_DESCRIPTION,
    };
    spec.servers = [
        {
            url: `${SETTINGS.APP_PROTOCOL}://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}${SETTINGS.APP_API_PREFIX}`,
            description: 'API server',
        },
    ];

    spec.components = spec.components || {};

    spec.components.securitySchemes = {
        bearerAuth: {
            type:         'http',
            scheme:       'bearer',
            bearerFormat: 'JWT',
            description:  'Enter: `<token>`',
        },
        ...spec.components.securitySchemes,
    };

    const uiOptions = {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
    };

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, uiOptions));
}
