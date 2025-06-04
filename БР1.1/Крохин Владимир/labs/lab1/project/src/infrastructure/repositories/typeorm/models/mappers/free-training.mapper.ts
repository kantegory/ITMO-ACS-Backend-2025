import { FreeTrainingEntity } from "../free-training.entity";
import { FreeTrainingModel } from "../../../../../application/domain/free-training.model";
import { UserModel } from "../../../../../application/domain/user.model";
import { TargetModel } from "../../../../../application/domain/target.model";
import { SeriesModel } from "../../../../../application/domain/series.model";
import { NoteModel } from "../../../../../application/domain/note.model";

export class FreeTrainingMapper {
    static toDomain(entity: FreeTrainingEntity): FreeTrainingModel {
        const model = new FreeTrainingModel(
            entity.id,
            entity.startTimeStamp,
            entity.weaponType,
            entity.target ? new TargetModel(
                entity.target.id,
                entity.target.name,
                entity.target.description
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

    static toEntity(model: FreeTrainingModel): FreeTrainingEntity {
        const entity = new FreeTrainingEntity();
        entity.id = model.id!;
        entity.startTimeStamp = model.startTimeStamp;
        entity.endTimeStamp = model.endTimeStamp;
        entity.weaponType = model.weaponType;
        
        if (model.target) {
            entity.target = {
                id: model.target.id!,
                name: model.target.name,
                description: model.target.description
            } as any;
        }

        return entity;
    }
} 