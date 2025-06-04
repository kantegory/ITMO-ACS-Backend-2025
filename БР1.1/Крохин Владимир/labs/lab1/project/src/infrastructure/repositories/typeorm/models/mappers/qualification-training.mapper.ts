import { QualificationTrainingEntity } from "../qualification-training.entity";
import { QualificationTrainingModel } from "../../../../../application/domain/qualification-training.model";
import { UserModel } from "../../../../../application/domain/user.model";
import { ExerciseModel } from "../../../../../application/domain/exercise.model";
import { SeriesModel } from "../../../../../application/domain/series.model";
import { NoteModel } from "../../../../../application/domain/note.model";

export class QualificationTrainingMapper {
    static toDomain(entity: QualificationTrainingEntity): QualificationTrainingModel {
        const model = new QualificationTrainingModel(
            entity.id,
            entity.startTimeStamp,
            entity.exercise ? new ExerciseModel(
                entity.exercise.id,
                entity.exercise.name,
                entity.exercise.description,
                entity.exercise.shots_in_series
            ) : null
        );

        if (entity.endTimeStamp) {
            model.endTimeStamp = entity.endTimeStamp;
        }

        if (entity.series) {
            model.series = entity.series.map(s => new SeriesModel(
                s.id,
                s.begin_time_offset,
                s.max_shots
            ));
        }

        if (entity.notes) {
            model.notes = entity.notes.map(n => new NoteModel(
                n.id,
                new UserModel(n.user.id, n.user.username, ""),
                n.created_at,
                n.updated_at,
                n.content
            ));
        }

        return model;
    }

    static toEntity(model: QualificationTrainingModel): QualificationTrainingEntity {
        const entity = new QualificationTrainingEntity();
        entity.id = model.id!;
        entity.startTimeStamp = model.startTimeStamp;
        entity.endTimeStamp = model.endTimeStamp;
        
        if (model.exercise) {
            entity.exercise = {
                id: model.exercise.id!,
                name: model.exercise.name,
                description: model.exercise.description,
                shots_in_series: model.exercise.shotsInSeries
            } as any;
        }

        return entity;
    }
} 