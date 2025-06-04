import { UserModel } from "../../../../domain/user.model";
import { UserEntity } from "../user.entity";

export class UserMapper {
    static toDomain(entity: UserEntity): UserModel {
        return new UserModel(
            entity.id,
            entity.username,
            entity.email,
            entity.password_hash,
            entity.first_name,
            entity.second_name,
            entity.avatar
        );
    }

    static toEntity(model: UserModel): UserEntity {
        const entity = new UserEntity();
        entity.id = model.id;
        entity.username = model.username;
        entity.email = model.email;
        entity.password_hash = model.password_hash;
        entity.first_name = model.first_name;
        entity.second_name = model.second_name;
        entity.avatar = model.avatar;
        return entity;
    }
} 