import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./app";

const PORT = 3000;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => console.error("Data source init error", error));