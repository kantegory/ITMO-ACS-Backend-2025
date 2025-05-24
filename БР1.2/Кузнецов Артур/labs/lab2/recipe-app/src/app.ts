import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/database';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import commentRouter from './routers/commentRouter';
import ingredientRouter from './routers/ingredientRouter';
import dishTypeRouter from './routers/dishTypeRouter';
import likeRouter from './routers/likeRouter';
import recipeDifficultyRouter from './routers/recipeDifficultyRouter';
import recipeIngredientRouter from './routers/recipeIngredientRouter';
import recipeRouter from './routers/recipeRouter';
import recipeStepRouter from './routers/recipeStepRouter';
import roleRouter from './routers/roleRouter';
import savedRecipeRouter from './routers/savedRecipeRouter';
import subscriptionRouter from './routers/subscriptionRouter';
import { initializeRoles } from './services/initRoleService';
import { initializeDishTypes } from './services/initDishTypeService';
import { initializeRecipeDifficulties } from './services/initRecipeDifficultyService';
import { initializeIngredients } from './services/initIngredientService';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 3000;
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());

const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: 'Hello, world!',
    });
};

app.get('/', handler);
app.use(errorHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);
app.use('/dish-type', dishTypeRouter);
app.use('/ingredient', ingredientRouter);
app.use('/like', likeRouter);
app.use('/recipe-difficulty', recipeDifficultyRouter);
app.use('/recipe-ingredient', recipeIngredientRouter);
app.use('/recipe', recipeRouter);
app.use('/recipe-step', recipeStepRouter);
app.use('/role', roleRouter);
app.use('/saved-recipe', savedRecipeRouter);
app.use('/subscription', subscriptionRouter);

AppDataSource
.initialize()
.then(async () => {
    console.log('Database connected');

    await initializeRoles();
    await initializeDishTypes();
    await initializeRecipeDifficulties();
    await initializeIngredients();

    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
    });
})
.catch((error) => console.log(error));
