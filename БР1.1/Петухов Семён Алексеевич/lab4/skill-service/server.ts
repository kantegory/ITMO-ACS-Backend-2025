import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from './swagger';
import { AppDataSource } from "./data-source";
import skillRoutes from "./routes/skillRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/skill-service/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/skill-service/skill", skillRoutes);


AppDataSource.initialize()
    .then(() => {
        app.listen(3005, () => {
            console.log("User service running on port 3005");
        });
    })
    .catch(console.error);
