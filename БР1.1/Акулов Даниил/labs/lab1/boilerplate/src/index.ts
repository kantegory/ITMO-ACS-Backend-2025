import express from "express";
import {dataSource} from "./config/dataSource";
import {router} from './routes'
import {errorHandler} from "./middleware/errorHandler";
import {SETTINGS} from "./config/settings";

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(SETTINGS.API_PORT, () => console.log(`Server started on http://localhost:${SETTINGS.API_PORT}`));
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });