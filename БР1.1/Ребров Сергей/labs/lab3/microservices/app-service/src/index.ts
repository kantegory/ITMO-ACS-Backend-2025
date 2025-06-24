import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import appRouter from "./route/application.route";
import cors from "cors";

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", appRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

startServer();
