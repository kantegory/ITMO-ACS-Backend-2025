import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { OrderDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { OrderController } from "./controllers/orderController";
import { PaymentController } from "./controllers/paymentController";
import { config } from "dotenv";

config();

const app = express();
const host = process.env.HOST;
const port = parseInt(process.env.PORT);

OrderDataSource.initialize().then(() => {
  console.log("Order DB connected");

  useExpressServer(app, {
    controllers: [OrderController, PaymentController],
    routePrefix: "",
    cors: true,
    defaultErrorHandler: true,
  });

  useSwagger(app, {
    controllers: [OrderController, PaymentController],
    serviceName: "Order Service",
    port
  });

  app.listen(port, () => {
    console.log(`🚀 Order service running at http://${host}:${port}`);
  });
});
