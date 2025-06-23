"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const apartments_1 = __importDefault(require("./routes/apartments"));
const buildings_1 = __importDefault(require("./routes/buildings"));
const contracts_1 = __importDefault(require("./routes/contracts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === "production"
        ? ["http://localhost:8080"]
        : true,
    credentials: true
}));
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files
app.use("/uploads", express_1.default.static("uploads"));
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/apartments", apartments_1.default);
app.use("/api/buildings", buildings_1.default);
app.use("/api/contracts", contracts_1.default);
// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use((err, req, res, next) => {
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
        await (0, database_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map