import "dotenv/config";
import { AppDataSource } from "./config/database";
import app from "./app";
import { setTimeout } from 'timers/promises';

const port = process.env.PORT || 3003;
const DB_RETRY_DELAY = 3000;
const MAX_RETRIES = 5;

async function initializeDatabase() {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await AppDataSource.initialize();
            console.log("Auth Service DB has been initialized!");
            return true;
        } catch (error) {
            let errorMessage = "Unknown database error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error(`Attempt ${attempt} failed to connect to DB:`, errorMessage);

            if (attempt < MAX_RETRIES) {
                console.log(`Retrying in ${DB_RETRY_DELAY/1000} seconds...`);
                await setTimeout(DB_RETRY_DELAY);
            }
        }
    }
    throw new Error(`Could not connect to DB after ${MAX_RETRIES} attempts`);
}

async function startServer() {
    try {
        await initializeDatabase();

        app.listen(port, () => {
            console.log(`Auth Service running on port ${port}`);
        });
    } catch (error) {
        let errorMessage = "Failed to start Auth Service";
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }
        console.error(errorMessage);
        process.exit(1);
    }
}

startServer();