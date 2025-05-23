import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import basicRoutes from "./routes/basicRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", basicRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });
