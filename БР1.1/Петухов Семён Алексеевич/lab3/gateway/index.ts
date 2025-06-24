import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use("/user-service", createProxyMiddleware({target: "http://localhost:3001", changeOrigin: true,}));
app.use("/resume-service", createProxyMiddleware({target: "http://localhost:3002", changeOrigin: true,}));
app.use("/vacancy-service", createProxyMiddleware({target: "http://localhost:3003", changeOrigin: true,}));
app.use("/skill-service", createProxyMiddleware({target: "http://localhost:3005", changeOrigin: true,}));

app.listen(3000, () => {
    console.log("API Gateway running on port 3000");
});
