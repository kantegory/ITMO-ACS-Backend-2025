import express from "express";
import { logRequestMiddleware } from "./middlewares/logMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import messageRoutes from "./routes/messageRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import rentalRoutes from "./routes/rentalRoutes";

const app = express();

app.use(logRequestMiddleware);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rentals", rentalRoutes);

app.use(errorMiddleware);

export default app;