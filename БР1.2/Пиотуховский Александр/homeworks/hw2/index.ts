import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { AppDataSource } from './config/data-source';
import userRoutes from './routes/userRoute';
import postRoutes from "./routes/postRoute";
import dishTypeRoutes from "./routes/dishTypeRoute";
import ingredientRoutes from "./routes/ingredientRoute";
import recipeRoutes from "./routes/recipeRoute";
import commentRoutes from "./routes/commentRoute";
import roleRoutes from "./routes/roleRoute";
import permissionRoute from "./routes/permissionRoute";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source initialized');

        const app = express();
        app.use(express.json());

        app.use('/user', userRoutes);
        app.use('/post', postRoutes);
        app.use('/dish_type', dishTypeRoutes);
        app.use('/ingredient', ingredientRoutes);
        app.use('/recipe', recipeRoutes);
        app.use('/comments', commentRoutes);
        app.use('/role', roleRoutes);
        app.use('/permissions', permissionRoute);

        app.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error in Data Source initialization', error);
    });
