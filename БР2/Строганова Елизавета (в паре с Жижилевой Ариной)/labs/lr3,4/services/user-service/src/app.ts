import express from "express";
import userRoutes from "./routes/user.routes";
import userMeasurementsProgressRoutes from "./routes/userMeasurementsProgress.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/users", userRoutes);
app.use("/measurements", userMeasurementsProgressRoutes);

export default app;