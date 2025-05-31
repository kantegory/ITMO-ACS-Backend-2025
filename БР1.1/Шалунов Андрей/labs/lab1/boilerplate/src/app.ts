import 'reflect-metadata';
import express, {Request, Response } from 'express';
import { AppDataSource } from './config/data-source';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    })
    .catch(error => console.error('Error:', error));