import express from "express";
import {AppDataSource} from "./config/data-source";
import userRouter from "./routes/user.router";

const app = express();

AppDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

app.use(express.json());
app.use('/users', userRouter);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));