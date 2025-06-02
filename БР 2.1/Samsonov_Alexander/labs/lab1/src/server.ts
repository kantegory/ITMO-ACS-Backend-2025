import * as dotenv from "dotenv";

dotenv.config();

import app from "./app";
import {AppDataSource} from "./data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {});
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
