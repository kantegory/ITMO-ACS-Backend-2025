import express from "express";
import { AppDataSource } from "./app-data-source";
import userRouter from "./services/userService";
import routeRouter from "./services/routeService";
import routePointRouter from "./services/routePointService";
import mediaRouter from "./services/mediaService";
import reviewRouter from "./services/reviewService";
import favoriteRouter from "./services/favoriteService";
import bookingRouter from "./services/bookingService";
import messageRouter from "./services/messageService";
import followRouter from "./services/followService";

// Initialize database connection
AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during initialization:", err));

// Create Express app
const app = express();
app.use(express.json());

// Register routes
app.use("/users", userRouter);
app.use("/routes", routeRouter);
app.use("/route-points", routePointRouter);
app.use("/media", mediaRouter);
app.use("/reviews", reviewRouter);
app.use("/favorites", favoriteRouter);
app.use("/bookings", bookingRouter);
app.use("/messages", messageRouter);
app.use("/follows", followRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});