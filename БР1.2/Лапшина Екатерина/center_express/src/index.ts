import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Import routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import apartmentRoutes from "./routes/apartments";
import buildingRoutes from "./routes/buildings";
import contractRoutes from "./routes/contracts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["http://localhost:8080"] 
    : true,
  credentials: true
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/contracts", contractRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Center Express API",
      version: "1.0.0",
      description: "Автодокументация API для backend центра недвижимости (Node.js/Express/TypeORM)",
    },
    servers: [
      {
        url: "http://localhost:" + PORT + "/api",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/entities/*.ts"
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: process.env.NODE_ENV === "development" ? err.message : "Internal server error" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer(); 