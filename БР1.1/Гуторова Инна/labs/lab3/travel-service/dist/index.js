"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
// Импорт маршрутов
const attractionRouter_1 = __importDefault(require("./routes/attractionRouter"));
const mediaRouter_1 = __importDefault(require("./routes/mediaRouter"));
const routeRouter_1 = __importDefault(require("./routes/routeRouter"));
const travelTypeRouter_1 = __importDefault(require("./routes/travelTypeRouter"));
const tripRouter_1 = __importDefault(require("./routes/tripRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected!");
    app.use("/api/attractions", attractionRouter_1.default);
    app.use("/api/media", mediaRouter_1.default);
    app.use("/api/routes", routeRouter_1.default);
    app.use("/api/travel-types", travelTypeRouter_1.default);
    app.use("/api/trips", tripRouter_1.default);
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});
exports.default = app;
