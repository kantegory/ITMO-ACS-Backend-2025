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
import { BookingController } from './controllers/booking.controller'
import { ErrorMiddleware } from './middlewares/error.middleware'

async function start(): Promise<void> {
    await AppDataSource.initialize()

    const app: Application = express()
    app.use(cors())
    app.use(express.json())

    useExpressServer(app, {
        routePrefix: '/api/bookings',
        controllers: [BookingController],
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
        { routePrefix: '/api/bookings', controllers: [BookingController] },
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
                title: 'Booking Service API',
                version: '1.0.0',
                description: 'CRUD для броней',
            },
            servers: [
                {
                    url: `http://localhost:${SETTINGS.PORT}/api/bookings`,
                },
            ],
        }
    )

    app.use('/api/bookings/docs', swaggerUi.serve, swaggerUi.setup(spec))

    app.listen(SETTINGS.PORT, () => {
        console.log(`Booking-service listening at http://localhost:${SETTINGS.PORT}/api/bookings`)
        console.log(`Swagger UI: http://localhost:${SETTINGS.PORT}/api/bookings/docs`)
    })
}

start().catch(err => {
    console.error('Error during bootstrap:', err)
    process.exit(1)
})