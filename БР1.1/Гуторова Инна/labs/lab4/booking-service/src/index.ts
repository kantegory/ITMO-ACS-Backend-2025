import express from "express";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";
import { authenticate } from "./middleware/auth";

import favoriteRoutes from "./routes/favoriteRouter";
import bookingRoutes from "./routes/bookingRouter";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/favorite", favoriteRoutes);


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