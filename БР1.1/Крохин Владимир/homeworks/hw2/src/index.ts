import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./ormconfig";

// Импорт роутеров
import userRoutes from "./routes/UserRoutes";
import coachRoutes from "./routes/CoachRoutes";
import athleteRoutes from "./routes/AthleteRoutes";
import weaponTypeRoutes from "./routes/WeaponTypeRoutes";
import targetRoutes from "./routes/TargetRoutes";
import exerciseRoutes from "./routes/ExerciseRoutes";
import trainingRoutes from "./routes/TrainingRoutes";
import freeTrainingRoutes from "./routes/FreeTrainingRoutes";
import qualificationTrainingRoutes from "./routes/QualificationTrainingRoutes";
import seriesRoutes from "./routes/SeriesRoutes";
import shotRoutes from "./routes/ShotRoutes";
import noteRoutes from "./routes/NoteRoutes";
import trainingNoteRoutes from "./routes/TrainingNoteRoutes";
import seriesNoteRoutes from "./routes/SeriesNoteRoutes";

const app = express();
app.use(bodyParser.json());

// Инициализируем соединение с БД
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Регистрируем роуты
    app.use("/users", userRoutes);
    app.use("/coaches", coachRoutes);
    app.use("/athletes", athleteRoutes);
    app.use("/weapon-types", weaponTypeRoutes);
    app.use("/targets", targetRoutes);
    app.use("/exercises", exerciseRoutes);
    app.use("/trainings", trainingRoutes);
    app.use("/free-trainings", freeTrainingRoutes);
    app.use("/qualification-trainings", qualificationTrainingRoutes);
    app.use("/series", seriesRoutes);
    app.use("/shots", shotRoutes);
    app.use("/notes", noteRoutes);
    app.use("/training-notes", trainingNoteRoutes);
    app.use("/series-notes", seriesNoteRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));
