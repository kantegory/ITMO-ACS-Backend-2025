import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

import userRoutes from "./routes/userRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import rentalRoutes from "./routes/rentalRoutes";
import messageRoutes from "./routes/messageRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import bookingRequestRoutes from "./routes/bookingRequestRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import complaintRoutes from "./routes/complaintRoutes";
import propertyImageRoutes from "./routes/propertyImageRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);
app.use("/rentals", rentalRoutes);
app.use("/messages", messageRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/booking-requests", bookingRequestRoutes);
app.use("/reviews", reviewRoutes);
app.use("/transactions", transactionRoutes);
app.use("/complaints", complaintRoutes);
app.use("/property-images", propertyImageRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
});
