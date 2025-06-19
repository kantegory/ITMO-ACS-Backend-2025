import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./app-data-source";
import router from "./routes";

// Загружаем переменные окружения в самом начале
dotenv.config({ path: '.env' });

// Проверка секретного ключа
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}

// Инициализация базы данных
AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during initialization:", err));

// Создание Express приложения
const app = express();
app.use(express.json());
app.use("/api", router);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set"}`);
});