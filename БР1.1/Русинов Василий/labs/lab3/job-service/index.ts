import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3002;

AppDataSource.initialize()
    .then(() => {
        console.log("Job service started");
        app.listen(PORT, () => console.log(`Job running on port ${PORT}`));
    })
    .catch((err) => console.error("Data Source init failed", err));
