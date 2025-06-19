import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./app-data-source";
import router from "./routes";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config({ path: '.env' });
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}
AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during initialization:", err));
const app = express();
app.use(express.json());
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travel Platform API',
            version: '1.0.0',
            description: 'API documentation for Travel Platform',
        },
        servers: [
            {
                url: 'http://localhost:3003/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set"}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});