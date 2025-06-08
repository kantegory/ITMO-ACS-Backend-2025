import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./router/userRouter";
import messageRouter from "./router/messageRouter";
import rentRouter from "./router/rentRouter";
import reviewRouter from "./router/reviewRouter";
import propertyRouter from "./router/propertyRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", userRouter);
    app.use("/api", messageRouter);
    app.use("/api", rentRouter);
    app.use("/api", reviewRouter);
    app.use("/api", propertyRouter);
    app.listen(3000);

    console.log("Express server has started on port 3000.");
  })
  .catch((error) => console.log(error));