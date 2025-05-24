import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { BlogDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { BlogPostController } from "./controllers/blogPostController";
import { BlogCommentController } from "./controllers/blogCommentController";

const app = express();
const port = 3004;

BlogDataSource.initialize().then(() => {
  console.log("Blog DB connected");

  useExpressServer(app, {
    controllers: [BlogPostController, BlogCommentController],
    routePrefix: "",
    cors: true,
    defaultErrorHandler: true,
  });

  useSwagger(app, {
    controllers: [BlogPostController, BlogCommentController],
    serviceName: "Blog Service",
    port
  });

  app.listen(port, () => {
    console.log(`🚀 Blog service running at http://localhost:${port}`);
  });
});
