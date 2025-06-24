import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { AppDataSource } from "./database/data-source";

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected!");
    app.listen(PORT, () => {
      console.log(`🚀 User Service is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message, error.stack);
  });