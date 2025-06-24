import "reflect-metadata";
import express, {Request, response, Response} from "express";
import { AppDataSource } from "./config/AppDataSourse"
import userRouter from "./routes/userRoutes"
import categoryRouter from "./routes/categoryRouter";
import advertisementRouter from "./routes/advertisementRouter";
import comfortRouter from "./routes/comfortRouter";
import roomRouter from "./routes/roomRouter";
import flatRouter from "./routes/flatRouter";
import CHouseRouter from "./routes/CHouseRouter";
import LivingRouter from "./routes/LivingRouter";
import propertyRouter from "./routes/propertyRouter";
import photoRouter from "./routes/photoRouter";
import LivingComfortRouter from "./routes/livingComfortRouter";
import MessageRouter from "./routes/messageRouter";
import LivingRulesRouter from "./routes/livingRulesRouter";
import RentalRouter from "./routes/rentalRouter";
import rulesRouter from "./routes/rulesRouter";

const app = express()
const PORT = 3000;


const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: "Hello world!"
    });
};

app.use(express.json());
app.get("/", handler);
app.use("/users", userRouter);
app.use('/categories', categoryRouter);
app.use("/advertisements", advertisementRouter)
app.use('/comfort', comfortRouter)
app.use('/room', roomRouter)
app.use("/flats", flatRouter);
app.use('/house', CHouseRouter)
app.use("/living", LivingRouter)
app.use('/property', propertyRouter)
app.use('/photo', photoRouter)
app.use('/livingComfort', LivingComfortRouter);
app.use('/message', MessageRouter)
app.use('/living_rules', LivingRulesRouter)
app.use('/rental', RentalRouter)
app.use('/rules', rulesRouter)



AppDataSource
    .initialize()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    })
    .catch((error) => console.log(error));
