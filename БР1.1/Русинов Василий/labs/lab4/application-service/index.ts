import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3003;

AppDataSource.initialize()
    .then(() => {
        console.log("Application service started");
        app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
    })
    .catch((err) => console.error("Data Source init failed", err));
