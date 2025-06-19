import express from "express";
import blogPostRoutes from "./routes/blogPost.routes";
import postCommentRoutes from "./routes/postComment.routes";
import postLikeRoutes from "./routes/postLike.routes";
import postTagRoutes from "./routes/postTag.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/posts", blogPostRoutes);
app.use("/comment", postCommentRoutes);
app.use("/like", postLikeRoutes);
app.use("/tag", postTagRoutes);

export default app;