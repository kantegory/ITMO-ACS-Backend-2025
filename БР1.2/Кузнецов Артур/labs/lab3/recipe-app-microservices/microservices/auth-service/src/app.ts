import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/database';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import roleRouter from './routers/roleRouter';
import { initializeRoles } from './services/initRoleService';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger';
import { errorHandler } from 'common-service/src/middleware/errorHandler';

const app = express();
const PORT = 3000;
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());

const handler = (_request: Request, response: Response) => {
    response.status(200).send({
        message: 'Auth Service!',
    });
};

app.get('/', handler);
app.use(errorHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/role', roleRouter);

AppDataSource
.initialize()
.then(async () => {
    console.log('Database connected');

    await initializeRoles();

    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
        console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
})
.catch((error) => console.log(error));
