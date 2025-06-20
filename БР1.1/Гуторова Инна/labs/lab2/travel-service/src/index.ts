import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";

import routeRouter from "./routes/routeRouter";
import tripRouter from "./routes/tripRouter";
import attractionRouter from "./routes/attractionRouter";
import bookingRouter from "./routes/bookingRouter";
import favoriteRouter from "./routes/favoriteRouter";
import commentRouter from "./routes/commentRouter";
import reviewRouter from "./routes/reviewRouter";
import travelTypeRouter from "./routes/travelTypeRouter";
import mediaRouter from "./routes/mediaRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/routes", routeRouter);
app.use("/api/trips", tripRouter);
app.use("/api/attractions", attractionRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/comments", commentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/travel-types", travelTypeRouter);
app.use("/api/media", mediaRouter);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

export default app;