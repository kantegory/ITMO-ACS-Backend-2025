import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import messageRoutes from "./routes/messageRoutes";
import rentalRoutes from "./routes/rentalRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/messages", messageRoutes);
app.use("/rentals", rentalRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Data Source initialized successfully!");

        app.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization:", err);
    });