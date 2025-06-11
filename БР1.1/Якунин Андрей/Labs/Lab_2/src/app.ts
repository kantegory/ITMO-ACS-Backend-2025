import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/AppDataSource";
import authRoutes from "./routers/authRoute";
import userRoutes from "./routers/userRouter";
import advertisementRouter from "./routers/advertisementRouter";
import categoryRouter from "./routers/categoryRouter";
import propertyRouter from "./routers/propertyRouter";
import express, { Request, Response } from "express";
import { setupSwagger } from './swagger';
import livingRouter from "./routers/livingRouter";
import flatRouter from "./routers/flatRouter";
import roomRouter from "./routers/roomRouter";
import rulerRouter from "./routers/rulerRouter";
import photoRouter from "./routers/photoRouter";
import rentalRouter from "./routers/rentalRouter";
import messageRouter from "./routers/messageRouter";
import  countryHouseRouter from './routers/ countryHouseRouter'
import comfortRouter from "./routers/comfortRouter";

const app = express();
const PORT = process.env.PORT || 3000;


const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: "Hello world!",
    });
};

app.use(express.json());
app.get("/", handler);

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("Database connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/ads', advertisementRouter);
app.use('/api/category', categoryRouter);
app.use("/api/property", propertyRouter);
app.use('/api/living', livingRouter);
app.use('/api/flat', flatRouter);
app.use('/api/room', roomRouter);
app.use('/api/rules', rulerRouter);
app.use('/api/photo', photoRouter);
app.use('/api/rental', rentalRouter);
app.use('/api/messages', messageRouter);
app.use('/api/countryHouse', countryHouseRouter);
app.use('/api/comfort', comfortRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

setupSwagger(app);