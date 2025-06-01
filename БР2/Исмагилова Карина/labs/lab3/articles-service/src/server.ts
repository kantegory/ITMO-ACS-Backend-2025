import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import articleRoutes from './articleRoutes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', articleRoutes);


const PORT = process.env.PORT || 3004;

AppDataSource.initialize().then(() => {
  console.log('Articles Service DB connected');
  app.listen(PORT, () => {
    console.log(`Articles service running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB init error', err);
});
