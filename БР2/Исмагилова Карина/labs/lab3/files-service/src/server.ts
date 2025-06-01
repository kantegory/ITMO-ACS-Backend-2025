import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import fileRoutes from './fileRoutes';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', fileRoutes);


const PORT = process.env.PORT || 3003;

AppDataSource.initialize().then(() => {
  console.log('Files Service DB connected');
  app.listen(PORT, () => {
    console.log(`Files service running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB init error', err);
});
