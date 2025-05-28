import 'reflect-metadata'
import 'express-async-errors'
import express, { Application } from 'express'
import cors from 'cors'
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers'
import swaggerUi from 'swagger-ui-express'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

import SETTINGS from './config/settings'
import { AppDataSource } from './config/data-source'
import { PhotoController } from './controllers/photo.controller'
import { ErrorMiddleware } from './middlewares/error.middleware'

async function start(): Promise<void> {
    await AppDataSource.initialize()

    const app: Application = express()
    app.use(cors())
    app.use(express.json())

    useExpressServer(app, {
        routePrefix: '/api/photos',
        controllers: [PhotoController],
        middlewares: [ErrorMiddleware],
        defaultErrorHandler: false,
        validation: true,
        classTransformer: true,
    })

    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/definitions/',
    })

    const spec = routingControllersToSpec(
        getMetadataArgsStorage(),
        { routePrefix: '/api/photos', controllers: [PhotoController] },
        {
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
            security: [{ bearerAuth: [] }],
            info: {
                title: 'Photo Service API',
                version: '1.0.0',
                description: 'CRUD для фото объектов',
            },
            servers: [
                {
                    url: `http://localhost:${SETTINGS.PORT}/api/photos`,
                },
            ],
        }
    )

    app.use('/api/photos/docs', swaggerUi.serve, swaggerUi.setup(spec))

    app.listen(SETTINGS.PORT, () => {
        console.log(`Photo-service listening at http://localhost:${SETTINGS.PORT}/api/photos`)
        console.log(`Swagger UI: http://localhost:${SETTINGS.PORT}/api/photos/docs`)
    })
}

start().catch(err => {
    console.error('Error during bootstrap:', err)
    process.exit(1)
})