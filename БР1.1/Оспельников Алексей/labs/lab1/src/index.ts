import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./router/UserRouter";
import rentRouter from "./router/RentRouter";
import messageRouter from "./router/MessageRouter";
import reviewRouter from "./router/ReviewRouter";
import propertyRouter from "./router/PropertyRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", userRouter);
    app.use("/api", rentRouter);
    app.use("/api", messageRouter);
    app.use("/api", reviewRouter);
    app.use("/api", propertyRouter);
    app.listen(3000);

    console.log("Express server has started on port 3000.");
  })
  .catch((error) => console.log(error));
