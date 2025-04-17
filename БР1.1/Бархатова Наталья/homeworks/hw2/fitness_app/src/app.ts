import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./AppDataSource"
import postRouter from "./routers/PostRouter";
import progressRouter from "./routers/ProgressRouter";
import trainingPlanRouter from "./routers/TrainingPlanRouter";
import userDetaisRouter from "./routers/UserDetailsRouter";
import userRouter from "./routers/UserRouter";
import workoutRouter from "./routers/WorkoutRouter";

const app = express();
const PORT = 3000;

const handler = (request: Request, response: Response) => {
  response.status(200).send({
      message: "Hello, world!",
  });
};

app.use(express.json());
app.get("/", handler);
app.use("/posts", postRouter);
app.use("/progresses", progressRouter);
app.use("/training_plans", trainingPlanRouter);
app.use("/userDetails", userDetaisRouter);
app.use("/users", userRouter);
app.use("/workouts", workoutRouter);


AppDataSource
.initialize()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    });
})
.catch((error) => console.log(error));