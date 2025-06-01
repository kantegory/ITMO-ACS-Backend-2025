import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import AppDataSource from './app-data-source';
import userRoutes from './userRoutes';
import authRoutes from "./authRoutes";
import authloginRoutes from "./authloginRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', authloginRoutes);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize().then(() => {
  console.log('User Service DB connected');
  app.listen(PORT, () => {
    console.log(`User service running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB init error', err);
});
