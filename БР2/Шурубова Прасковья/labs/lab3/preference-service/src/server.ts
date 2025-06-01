import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import collectionRoutes from './collectionRoutes';
import favouriteRoutes from './favouriteRoutes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/collections', collectionRoutes);
app.use('/favourites', favouriteRoutes);

const PORT = process.env.PORT || 3006;

AppDataSource.initialize().then(() => {
  console.log('User Service DB connected');
  app.listen(PORT, () => {
    console.log(`User service running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB init error', err);
});
