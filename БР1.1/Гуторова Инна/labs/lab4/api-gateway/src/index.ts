import express from 'express';
import cors from 'cors';
import { proxies } from './proxy';
import { errorHandler } from './middleware/errorHandler';
import { SERVICE_PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json());

Object.entries(proxies).forEach(([path, handler]) => {
  app.use(path, handler);
});

app.use(errorHandler);

app.listen(SERVICE_PORT, () => {
  console.log(`API Gateway running on  http://localhost:${SERVICE_PORT}`);
});

export { app };