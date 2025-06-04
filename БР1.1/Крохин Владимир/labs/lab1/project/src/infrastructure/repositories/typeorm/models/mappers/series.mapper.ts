import { SeriesEntity } from "../series.entity";
import { SeriesModel } from "../../../../domain/series.model";
import { TrainingMapper } from "./training.mapper";

export class SeriesMapper {
    static toDomain(entity: SeriesEntity): SeriesModel {
        return new SeriesModel(
            entity.id,
            entity.training ? TrainingMapper.toDomain(entity.training) : undefined,
            entity.begin_time_offset,
            entity.end_time_offset,
            entity.max_shots ?? undefined
        );
    }

    static toEntity(model: SeriesModel): SeriesEntity {
        const entity = new SeriesEntity();
        entity.id = model.id;
        entity.training = model.training ? TrainingMapper.toEntity(model.training) : undefined;
        entity.begin_time_offset = model.beginTimeOffset;
        entity.end_time_offset = model.endTimeOffset ?? null;
        entity.max_shots = model.max_shots ?? null;
        return entity;
    }
} 