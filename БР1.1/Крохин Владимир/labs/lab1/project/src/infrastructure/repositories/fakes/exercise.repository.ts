import { ExerciseModel } from '../../../application/domain/exercise.model';
import { ExerciseRepository } from '../interfaces/exercise.repository';
import { BaseFakeRepository } from './base.repository';

export class FakeExerciseRepository extends BaseFakeRepository<ExerciseModel> implements ExerciseRepository {
    constructor() {
        super();
    }

    async findById(id: number): Promise<ExerciseModel | null> {
        return this.items.find(item => item.id === id) || null;
    }

    async findAll(): Promise<ExerciseModel[]> {
        return this.items;
    }

    async save(exercise: ExerciseModel): Promise<ExerciseModel> {
        const existingIndex = this.items.findIndex(item => item.id === exercise.id);
        if (existingIndex >= 0) {
            this.items[existingIndex] = exercise;
        } else {
            this.items.push(exercise);
        }
        return exercise;
    }

    async delete(id: number): Promise<void> {
        const index = this.items.findIndex(item => item.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
} 