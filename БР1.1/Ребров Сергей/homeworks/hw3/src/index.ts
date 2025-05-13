import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import userRoutes from "./route/user.route";
import roleRoutes from "./route/role.route";
import resumeRouter from "./route/resume.route";
import jobRouter from "./route/job.route";
import appRouter from "./route/application.route";
import expRouter from "./route/experience.route";
import eduRouter from "./route/education.route";

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", resumeRouter);
app.use("/api", jobRouter);
app.use("/api", appRouter);
app.use("/api", expRouter);
app.use("/api", eduRouter);
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
