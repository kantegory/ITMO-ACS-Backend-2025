import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
    .then(() => {
        console.log("Auth service started");
        app.listen(PORT, () => console.log(`Auth running on port ${PORT}`));
    })
    .catch((err) => console.error("Data Source init failed", err));
