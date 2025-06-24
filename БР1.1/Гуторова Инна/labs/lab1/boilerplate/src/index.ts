import express from "express";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Database connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
  