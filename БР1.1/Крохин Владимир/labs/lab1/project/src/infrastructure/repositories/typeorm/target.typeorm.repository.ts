import { Repository } from 'typeorm';
import { TargetModel } from '../../../application/domain/target.model';
import { TargetRepository } from '../interfaces/target.repository';
import { TargetEntity } from './models/target.entity';

export class TargetTypeOrmRepository implements TargetRepository {
    constructor(private readonly repository: Repository<TargetEntity>) {}

    async findById(id: number): Promise<TargetModel | null> {
        const target = await this.repository.findOne({ where: { id } });
        if (!target) return null;
        return this.mapToModel(target);
    }

    async findByName(name: string): Promise<TargetModel | null> {
        const target = await this.repository.findOne({ where: { name } });
        if (!target) return null;
        return this.mapToModel(target);
    }

    async save(target: TargetModel): Promise<TargetModel> {
        const entity = this.mapToEntity(target);
        const saved = await this.repository.save(entity);
        return this.mapToModel(saved);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private mapToModel(entity: TargetEntity): TargetModel {
        return new TargetModel(
            entity.id,
            entity.name,
            entity.description,
        );
    }

    private mapToEntity(model: TargetModel): TargetEntity {
        const entity = new TargetEntity();
        entity.id = model.id;
        entity.name = model.name;
        entity.description = model.description;
        return entity;
    }
} 