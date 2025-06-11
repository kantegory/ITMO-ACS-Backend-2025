import "dotenv/config";
import { AppDataSource } from "./config/database";
import app from "./app";

const port = process.env.PORT || 3004;

AppDataSource.initialize()
    .then(() => {
        console.log("Rental Service DB has been initialized!");

        app.listen(port, () => {
            console.log(`Rental Service running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Rental Service DB initialization:", err);
    });