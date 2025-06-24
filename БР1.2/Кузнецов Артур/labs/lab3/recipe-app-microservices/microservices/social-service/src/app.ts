import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/database';
import commentRouter from './routers/commentRouter';
import likeRouter from './routers/likeRouter';
import savedRecipeRouter from './routers/savedRecipeRouter';
import subscriptionRouter from './routers/subscriptionRouter';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger';
import { errorHandler } from 'common-service/src/middleware/errorHandler';

const app = express();
const PORT = 3002;
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());

const handler = (_request: Request, response: Response) => {
    response.status(200).send({
        message: 'Social Service!',
    });
};

app.get('/', handler);
app.use(errorHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/saved-recipe', savedRecipeRouter);
app.use('/subscription', subscriptionRouter);

AppDataSource
.initialize()
.then(async () => {
    console.log('Database connected');

    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
        console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
})
.catch((error) => console.log(error));
