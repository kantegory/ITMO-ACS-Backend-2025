import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(express.json());

app.use("/auth", createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true }));
app.use("/users", createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true }));

app.use("/jobs", createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true }));
app.use("/employers", createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true }));
app.use("/industries", createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true }));

app.use("/applications", createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true }));
app.use("/resumes", createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true }));

export default app;
