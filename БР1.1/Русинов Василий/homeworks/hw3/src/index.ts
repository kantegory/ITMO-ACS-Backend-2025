import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./app";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });


//tsx в package.json