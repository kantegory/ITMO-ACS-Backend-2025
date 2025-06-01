import express from "express";
import rentalRoutes from "./routes/rental.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/rentals", rentalRoutes);
app.use(errorMiddleware);

export default app;