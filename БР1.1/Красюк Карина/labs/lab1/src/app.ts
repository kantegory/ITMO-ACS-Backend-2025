import express from "express"
import dataSource from "./config/data-source"

import { useExpressServer } from 'routing-controllers';
import AuthController from "./controllers/auth.controller";
import {UserController} from "./controllers/user.controller";

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

let app = express()
app.use(express.json())

const options = {
    routePrefix: "/api",
    controllers: [
        UserController,
        AuthController
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options);


app.listen(3000, () => console.log("Server started on http://localhost:3000"));