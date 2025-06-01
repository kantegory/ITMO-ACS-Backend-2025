import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import ratingRoutes from './ratingRoutes';
import commentRoutes from './commentsRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/comments', commentRoutes);
app.use('/ratings', ratingRoutes);

const PORT = process.env.PORT || 3005;

AppDataSource.initialize()
  .then(() => {
    console.log('Feedback Service DB connected');
    app.listen(PORT, () => {
      console.log(`Feedback service running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB init error', err);
  });