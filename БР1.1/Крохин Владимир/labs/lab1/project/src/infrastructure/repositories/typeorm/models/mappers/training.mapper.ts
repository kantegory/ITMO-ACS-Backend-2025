import { TrainingEntity } from "../training.entity";
import { TrainingModel } from "../../../../domain/training.model";

export class TrainingMapper {
    static toDomain(entity: TrainingEntity): TrainingModel {
        return new TrainingModel(entity.startTs);
    }

    static toEntity(model: TrainingModel): TrainingEntity {
        const entity = new TrainingEntity();
        entity.startTs = (model as any)._startTs;
        return entity;
    }
} 