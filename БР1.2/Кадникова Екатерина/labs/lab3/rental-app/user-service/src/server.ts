import "dotenv/config";
import { AppDataSource } from "./config/database";
import app from "./app";

const port = process.env.PORT || 3002;

AppDataSource.initialize()
    .then(() => {
        console.log("User Service DB has been initialized!");

        app.listen(port, () => {
            console.log(`User Service running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during User Service DB initialization:", err);
    });