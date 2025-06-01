import express from "express";
import propertyRoutes from "./routes/property.route";
import favoriteRoutes from "./routes/favorite.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/properties", propertyRoutes);
app.use("/favorites", favoriteRoutes);
app.use(errorMiddleware);

export default app;