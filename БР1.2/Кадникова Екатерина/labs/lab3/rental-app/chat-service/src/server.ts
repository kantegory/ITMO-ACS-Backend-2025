import "dotenv/config";
import { AppDataSource } from "./config/database";
import app from "./app";

const port = process.env.PORT || 3004;

AppDataSource.initialize()
    .then(() => {
        console.log("Message Service DB has been initialized!");

        app.listen(port, () => {
            console.log(`Message Service running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Message Service DB initialization:", err);
    });