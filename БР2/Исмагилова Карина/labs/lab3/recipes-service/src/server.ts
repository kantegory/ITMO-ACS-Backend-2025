import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import recipeRoutes from './recipeRoutes';
import categoryRoutes from './categoryRoutes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', recipeRoutes);
app.use('/categories', categoryRoutes);


const PORT = process.env.PORT || 3002;

AppDataSource.initialize().then(() => {
  console.log('Recipes Service DB connected');
  app.listen(PORT, () => {
    console.log(`Recipes service running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB init error', err);
});
