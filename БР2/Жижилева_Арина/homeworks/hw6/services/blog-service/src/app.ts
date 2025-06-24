import express from "express";
import blogRoutes from "./routes/blogPost.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/blog", blogRoutes);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

export default app;