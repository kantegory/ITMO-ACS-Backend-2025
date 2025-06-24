import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/database';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';

const app = express();
const PORT = 3000;

app.use(express.json());

const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: 'Hello, world!',
    });
};

app.get('/', handler);
app.use('/users', userRouter);
app.use('/auth', authRouter);

AppDataSource
.initialize()
.then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
    });
})
.catch((error) => console.log(error));
