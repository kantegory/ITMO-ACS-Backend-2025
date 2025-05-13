import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { OrderDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { OrderController } from "./controllers/orderController";
import { PaymentController } from "./controllers/paymentController";

const app = express();
const port = 3003;

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
    console.log(`🚀 Order service running at http://localhost:${port}`);
  });
});
