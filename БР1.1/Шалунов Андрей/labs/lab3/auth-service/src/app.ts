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
import { AuthController } from './controllers/auth.controller'
import { ErrorMiddleware } from './middlewares/error.middleware'

async function start(): Promise<void> {
    await AppDataSource.initialize()

    const app: Application = express()
    app.use(cors())
    app.use(express.json())

    useExpressServer(app, {
        routePrefix: '/api/auth',
        controllers: [AuthController],
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
        { routePrefix: '/api/auth', controllers: [AuthController] },
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
                title: 'Auth Service API',
                version: '1.0.0',
                description: 'API для регистрации и авторизации пользователей',
            },
            servers: [
                {
                    url: `http://localhost:${SETTINGS.PORT}/api/auth`,
                },
            ],
        }
    )

    app.use('/api/auth/docs', swaggerUi.serve, swaggerUi.setup(spec))

    app.listen(SETTINGS.PORT, () => {
        console.log(`Auth-service listening at http://localhost:${SETTINGS.PORT}/api/auth`)
        console.log(`Swagger UI: http://localhost:${SETTINGS.PORT}/api/auth/docs`)
    })
}

start().catch(err => {
    console.error('Error during bootstrap:', err)
    process.exit(1)
})