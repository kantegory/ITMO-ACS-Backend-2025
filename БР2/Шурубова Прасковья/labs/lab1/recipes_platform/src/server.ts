import express, { Application } from "express";
import dotenv from "dotenv";
import AppDataSource from "./app-data-source";
import routes from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
