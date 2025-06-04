import { ExerciseModel } from "../../../../../application/domain/exercise.model";
import { ExerciseEntity } from "../exercise.entity";

export class ExerciseMapper {
    static toDomain(entity: ExerciseEntity): ExerciseModel {
        return new ExerciseModel(
            entity.id,
            entity.name,
            entity.description,
            entity.shots_in_series
        );
    }

    static toEntity(model: ExerciseModel): ExerciseEntity {
        const entity = new ExerciseEntity();
        entity.id = model.id;
        entity.name = model.name;
        entity.description = model.description;
        entity.shots_in_series = model.shotsInSeries;
        return entity;
    }
} 