import express, { Response as ExResponse, Request as ExRequest, json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from "./routes/routes";
import {errorHandler} from "./middleware/error.handler";

export const app = express();

app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json'))
    );
});
RegisterRoutes(app);
app.use(errorHandler)
