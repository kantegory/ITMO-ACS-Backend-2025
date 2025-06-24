import express from "express";
import dataSource from "./config/data-source";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import {errorHandler} from "./middleware/error.handler";
import {authMiddleware} from "./middleware/auth.handler";


const app = express();

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
app.listen(3000, () => console.log("Server started on http://localhost:3000"));