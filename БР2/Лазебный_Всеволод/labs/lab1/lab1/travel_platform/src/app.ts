import express from "express";
import { AppDataSource } from "./app-data-source";
import router from "./routes";

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during initialization:", err));

const app = express();
app.use(express.json());
app.use("/api", router);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});