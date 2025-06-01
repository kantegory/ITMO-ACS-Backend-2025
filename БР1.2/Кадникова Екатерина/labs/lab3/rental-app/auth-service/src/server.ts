import "dotenv/config";
import { AppDataSource } from "./config/database";
import app from "./app";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Auth Service DB has been initialized!");

        app.listen(port, () => {
            console.log(`Auth Service running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Auth Service DB initialization:", err);
    });