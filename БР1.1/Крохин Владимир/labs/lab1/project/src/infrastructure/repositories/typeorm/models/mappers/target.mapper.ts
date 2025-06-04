import { TargetModel } from "../../../../../application/domain/target.model";
import { TargetEntity } from "../target.entity";

export class TargetMapper {
    static toDomain(entity: TargetEntity): TargetModel {
        return new TargetModel(
            entity.id,
            entity.name,
            entity.description,
        );
    }

    static toEntity(model: TargetModel): TargetEntity {
        const entity = new TargetEntity();
        entity.id = model.id;
        entity.name = model.name;
        entity.description = model.description;
        return entity;
    }
} 