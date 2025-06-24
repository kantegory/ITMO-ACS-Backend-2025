import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import jobRouter from "./route/job.route";
import cors from "cors";

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jobRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

startServer();
