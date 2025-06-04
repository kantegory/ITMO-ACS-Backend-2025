import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Coach } from "./entities/Coach";
import { Athlete } from "./entities/Athlete";
import { WeaponType } from "./entities/WeaponType";
import { Target } from "./entities/Target";
import { Exercise } from "./entities/Exercise";
import { Training } from "./entities/Training";
import { FreeTraining } from "./entities/FreeTraining";
import { QualificationTraining } from "./entities/QualificationTraining";
import { Series } from "./entities/Series";
import { Shot } from "./entities/Shot";
import { Note } from "./entities/Note";
import { TrainingNote } from "./entities/TrainingNote";
import { SeriesNote } from "./entities/SeriesNote";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,         // В реальном проекте ставьте false и используйте миграции
  logging: false,
  entities: [
    User,
    Coach,
    Athlete,
    WeaponType,
    Target,
    Exercise,
    Training,
    FreeTraining,
    QualificationTraining,
    Series,
    Shot,
    Note,
    TrainingNote,
    SeriesNote,
  ],
});
