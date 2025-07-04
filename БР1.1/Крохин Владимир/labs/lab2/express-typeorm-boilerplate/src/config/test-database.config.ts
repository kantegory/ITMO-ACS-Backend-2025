import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { AthleteEntity } from '../models/athlete.entity';
import { CoachEntity } from '../models/coach.entity';
import { TrainingEntity } from '../models/training.entity';
import { WeaponTypeEntity } from '../models/weapon-type.entity';
import { TargetEntity } from '../models/target.entity';
import { ExerciseEntity } from '../models/exercise.entity';
import { SeriesEntity } from '../models/series.entity';
import { NoteEntity } from '../models/note.entity';
import { ShotEntity } from '../models/shot.entity';
import { SeriesNotesEntity } from '../models/series-notes.entity';
import { TrainingNotesEntity } from '../models/training-notes.entity';
import { FreeTrainingEntity } from '../models/free-training.entity';
import { QualificationTrainingEntity } from '../models/qualification-training.entity';

export const testDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'test_db',
    entities: [
        UserEntity,
        AthleteEntity,
        CoachEntity,
        TrainingEntity,
        WeaponTypeEntity,
        TargetEntity,
        ExerciseEntity,
        SeriesEntity,
        NoteEntity,
        ShotEntity,
        SeriesNotesEntity,
        TrainingNotesEntity,
        FreeTrainingEntity,
        QualificationTrainingEntity,
    ],
    synchronize: true,
    dropSchema: true,
};
