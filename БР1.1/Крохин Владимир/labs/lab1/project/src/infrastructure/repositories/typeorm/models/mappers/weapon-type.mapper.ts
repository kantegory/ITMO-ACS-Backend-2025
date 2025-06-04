import { WeaponTypeEntity } from '../weapon-type.entity';
import { WeaponTypeModel } from '../../../../../application/domain/weapon-type.model';

export class WeaponTypeMapper {
    static toDomain(entity: WeaponTypeEntity): WeaponTypeModel {
        return new WeaponTypeModel(entity.id, entity.name, entity.description);
    }

    static toEntity(model: WeaponTypeModel): WeaponTypeEntity {
        const entity = new WeaponTypeEntity();
        if (model.id) {
            entity.id = model.id;
        }
        entity.name = model.name;
        entity.description = model.description;
        return entity;
    }
} 