import express from "express";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";
import { authenticate } from "./middleware/auth";

// Импорт маршрутов
import attractionRoutes from "./routes/attractionRouter";
import mediaRoutes from "./routes/mediaRouter";
import routeRoutes from "./routes/routeRouter";
import travelTypeRoutes from "./routes/travelTypeRouter";
import tripRoutes from "./routes/tripRouter";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    
    app.use("/api/attractions", attractionRoutes);
    app.use("/api/media", mediaRoutes);
    app.use("/api/routes", routeRoutes);
    app.use("/api/travel-types", travelTypeRoutes);
    app.use("/api/trips", tripRoutes);

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