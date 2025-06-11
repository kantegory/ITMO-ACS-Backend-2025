import { config } from 'dotenv';
config(); // Загружает переменные из .env файла в process.env

import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/user.routes';
import currentProgressRoutes from './routes/current-progress.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/current-progress', currentProgressRoutes); 

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`User Service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error in User Service: ', error));