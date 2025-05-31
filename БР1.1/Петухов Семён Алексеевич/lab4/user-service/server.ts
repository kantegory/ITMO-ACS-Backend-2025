import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from './swagger';
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user-service/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user-service/user", userRoutes);

AppDataSource.initialize()
    .then(() => {
        app.listen(3001, () => {
            console.log("User service running on port 3001");
        });
    })
    .catch(console.error);
