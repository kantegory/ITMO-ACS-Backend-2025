import "dotenv-safe/config";

import * as dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";
import app from "./app";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });