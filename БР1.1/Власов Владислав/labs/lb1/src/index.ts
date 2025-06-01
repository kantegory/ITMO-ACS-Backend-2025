import 'reflect-metadata';
import express, { Request, Response } from "express"
import dataSource from "./config/data-source"
import { useSwagger } from './swagger';

import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    UseBefore,
    Req,
    Res,
} from 'routing-controllers';
import { useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/user';
import { AuthorizationController } from './controllers/authorization';

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    
// create and setup express app
let app = express()
app.use(express.json())

const options = {
    routePrefix: "/api",
    controllers: [
        UsersController,
        AuthorizationController
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options);


app.listen(3000, () => console.log("Server started on http://localhost:3000"));