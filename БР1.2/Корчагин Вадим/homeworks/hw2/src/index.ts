import "reflect-metadata"
import express from "express"
import { AppDataSource } from "./data-source"
import userRoutes from "./routes/userRoutes"
import workoutRoutes from "./routes/workoutRoutes"
import trainingPlanRoutes from "./routes/trainingPlanRoutes"
import trainingPlanWorkoutRoutes from "./routes/trainingPlanWorkoutRoutes"
import userTrainingPlanRoutes from "./routes/userTrainingPlanRoutes"
import userProgressRoutes from "./routes/userProgressRoutes"
import blogPostRoutes from "./routes/blogPostRoutes"
import blogCommentRoutes from "./routes/blogCommentRoutes"
import orderRoutes from "./routes/orderRoutes"
import paymentRoutes from "./routes/paymentRoutes"
import roleRoutes from "./routes/roleRoutes"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger-output.json"

const app = express()
app.use(express.json())
app.use("/users", userRoutes)
app.use("/workouts", workoutRoutes)
app.use("/training-plans", trainingPlanRoutes)
app.use("/training-plan-workouts", trainingPlanWorkoutRoutes)
app.use("/user-training-plans", userTrainingPlanRoutes)
app.use("/user-progress", userProgressRoutes)
app.use("/blog-posts", blogPostRoutes)
app.use("/blog-comments", blogCommentRoutes)
app.use("/orders", orderRoutes)
app.use("/payments", paymentRoutes)
app.use("/roles", roleRoutes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


AppDataSource.initialize()
  .then(() => {
    console.log("DB connected")
    app.listen(3000, () => console.log("Server running at http://localhost:3000"))
  })
  .catch(console.error)
