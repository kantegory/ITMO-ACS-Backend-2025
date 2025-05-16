import express from "express";
import { AppDataSource } from "./config/data-source";
import basicRoutes from "./routes/basicRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", basicRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Data Source has been initialized");
        app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization", err);
    });
