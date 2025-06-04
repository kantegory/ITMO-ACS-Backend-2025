import { Repository } from 'typeorm';
import { ShotModel } from '../../../application/domain/shot.model';
import { ShotRepository } from '../interfaces/shot.repository';
import { ShotEntity } from './models/shot.entity';

export class ShotTypeOrmRepository implements ShotRepository {
    constructor(private readonly repository: Repository<ShotEntity>) {}

    async findById(id: number): Promise<ShotModel | null> {
        const shot = await this.repository.findOne({ where: { id }, relations: ['series'] });
        if (!shot) return null;
        return this.mapToModel(shot);
    }

    async save(shot: ShotModel): Promise<ShotModel> {
        const entity = this.mapToEntity(shot);
        const saved = await this.repository.save(entity);
        return this.mapToModel(saved);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findAllBySeries(seriesId: number): Promise<ShotModel[]> {
        const shots = await this.repository.find({
            where: { series: { id: seriesId } },
            relations: ['series'],
            order: { timeOffset: 'ASC' }
        });
        return shots.map(shot => this.mapToModel(shot));
    }

    private mapToModel(entity: ShotEntity): ShotModel {
        return new ShotModel(
            entity.id,
            entity.x,
            entity.y,
            entity.score,
            entity.timeOffset
        );
    }

    private mapToEntity(model: ShotModel): ShotEntity {
        const entity = new ShotEntity();
        entity.id = model.id;
        entity.x = model.x;
        entity.y = model.y;
        entity.score = model.score;
        entity.timeOffset = model.timeOffset;
        return entity;
    }
} 