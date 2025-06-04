import { ShotModel } from "../../../../../application/domain/shot.model";
import { ShotEntity } from "../shot.entity";

export class ShotMapper {
    static toDomain(entity: ShotEntity): ShotModel {
        return new ShotModel(
            entity.id,
            entity.x,
            entity.y,
            entity.score,
            entity.time_offset,
        );
    }

    static toEntity(model: ShotModel): ShotEntity {
        const entity = new ShotEntity();
        entity.id = model.id;
        entity.x = model.x;
        entity.y = model.y;
        entity.score = model.score;
        entity.time_offset = model.timeOffset;
        return entity;
    }
} 