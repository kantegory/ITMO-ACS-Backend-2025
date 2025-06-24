import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import { router as userRouter } from "./entity/user";
import { router as roleRouter } from "./entity/role";
import { router as resumeRouter } from "./entity/resume";
import { router as jobRouter } from "./entity/job";
import { router as applicationRouter } from "./entity/application";
import { router as experienceRouter } from "./entity/experience";
import { router as educationRouter } from "./entity/education";

const app = express();

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", roleRouter);
app.use("/api", resumeRouter);
app.use("/api", jobRouter);
app.use("/api", applicationRouter);
app.use("/api", experienceRouter);
app.use("/api", educationRouter);

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
