import express, { Application } from "express";
import AppDataSource from "./app-data-source";
import routes from "./routes/routes";
import setupSwagger from "./swagger";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);
setupSwagger(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Swagger docs at http://localhost:${port}/docs`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
