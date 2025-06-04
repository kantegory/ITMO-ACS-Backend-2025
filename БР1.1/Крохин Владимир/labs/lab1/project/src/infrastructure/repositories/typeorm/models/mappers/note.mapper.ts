import { NoteModel } from "../../../../../domain/note.model";
import { NoteEntity } from "../note.entity";
import { UserMapper } from "./user.mapper";

export class NoteMapper {
    static toDomain(entity: NoteEntity): NoteModel {
        return new NoteModel(
            entity.id,
            entity.user ? UserMapper.toDomain(entity.user) : undefined,
            entity.created_at,
            entity.edited_at,
            entity.content
        );
    }

    static toEntity(model: NoteModel): NoteEntity {
        const entity = new NoteEntity();
        entity.id = model.id;
        if (model.user) entity.user = UserMapper.toEntity(model.user);
        entity.created_at = model.createdAt;
        entity.edited_at = model.editedAt;
        entity.content = model.content;
        return entity;
    }
} 