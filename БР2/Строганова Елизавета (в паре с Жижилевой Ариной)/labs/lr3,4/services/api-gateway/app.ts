import express from "express";
import axios from "axios";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Proxy routes to User Service
app.use("/users", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.USER_SERVICE_URL}/users${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/measurements", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.USER_SERVICE_URL}/measurements${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

// Proxy routes to Workout Service
app.use("/plans", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.WORKOUT_SERVICE_URL}/plans${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/workouts", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.WORKOUT_SERVICE_URL}/workouts${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/workout-progress", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.WORKOUT_SERVICE_URL}/workout-progress${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

// Proxy routes to Blog Service
app.use("/posts", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BLOG_SERVICE_URL}/posts${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/comment", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BLOG_SERVICE_URL}/comment${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/like", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BLOG_SERVICE_URL}/like${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

app.use("/tag", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BLOG_SERVICE_URL}/tag${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

// Auth routes
app.use("/auth", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.USER_SERVICE_URL}/auth${req.path}`,
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal server error" });
  }
});

export default app;