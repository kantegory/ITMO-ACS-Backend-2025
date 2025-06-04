import { Repository } from 'typeorm';
import { ExerciseModel } from '../../../application/domain/exercise.model';
import { ExerciseRepository } from '../interfaces/exercise.repository';
import { ExerciseEntity } from './models/exercise.entity';

export class ExerciseTypeOrmRepository implements ExerciseRepository {
    constructor(private readonly repository: Repository<ExerciseEntity>) {}

    async findById(id: number): Promise<ExerciseModel | null> {
        const exercise = await this.repository.findOne({ where: { id } });
        if (!exercise) return null;
        return this.mapToModel(exercise);
    }

    async findByName(name: string): Promise<ExerciseModel | null> {
        const exercise = await this.repository.findOne({ where: { name } });
        if (!exercise) return null;
        return this.mapToModel(exercise);
    }

    async save(exercise: ExerciseModel): Promise<ExerciseModel> {
        const entity = this.mapToEntity(exercise);
        const saved = await this.repository.save(entity);
        return this.mapToModel(saved);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    private mapToModel(entity: ExerciseEntity): ExerciseModel {
        return new ExerciseModel(
            entity.id,
            entity.name,
            entity.description,
            entity.shots_in_series
        );
    }

    private mapToEntity(model: ExerciseModel): ExerciseEntity {
        const entity = new ExerciseEntity();
        entity.id = model.id;
        entity.name = model.name;
        entity.description = model.description;
        entity.shots_in_series = model.shotsInSeries;
        return entity;
    }
} 