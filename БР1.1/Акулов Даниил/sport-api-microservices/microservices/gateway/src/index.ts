import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import {SETTINGS} from "./config/settings";

const app = express();

app.use("/user", createProxyMiddleware({target: `http://localhost:${SETTINGS.API_USER_PORT}`, changeOrigin: true,}));
app.use("/blog", createProxyMiddleware({target: `http://localhost:${SETTINGS.API_BLOG_PORT}`, changeOrigin: true,}));
app.use("/workout", createProxyMiddleware({target: `http://localhost:${SETTINGS.API_WORKOUT_PORT}`, changeOrigin: true,}));

app.listen(SETTINGS.API_PORT, () => {
    console.log(`API Gateway running on port ${SETTINGS.API_PORT}`);
});