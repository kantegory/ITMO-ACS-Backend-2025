import { Repository } from 'typeorm';
import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';
import { WeaponTypeRepository } from '../interfaces/weapon-type.repository';
import { WeaponTypeEntity } from './models/weapon-type.entity';
import { WeaponTypeMapper } from './models/mappers/weapons-type.mapper';

export class WeaponTypeTypeOrmRepository implements WeaponTypeRepository {
    constructor(private readonly repository: Repository<WeaponTypeEntity>) {}

    async findById(id: number): Promise<WeaponTypeModel | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? WeaponTypeMapper.toDomain(entity) : null;
    }

    async findAll(): Promise<WeaponTypeModel[]> {
        const entities = await this.repository.find();
        return entities.map(WeaponTypeMapper.toDomain);
    }

    async save(weaponType: WeaponTypeModel): Promise<WeaponTypeModel> {
        const entity = WeaponTypeMapper.toEntity(weaponType);
        const savedEntity = await this.repository.save(entity);
        return WeaponTypeMapper.toDomain(savedEntity);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
} 