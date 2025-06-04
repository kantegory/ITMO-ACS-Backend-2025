import { TrainingRepository } from '../interfaces/training.repository';
import { TrainingModel } from '../../../application/domain/training.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { ShotModel } from '../../../application/domain/shot.model';

export class FakeTrainingRepository implements TrainingRepository {
    private trainings: TrainingModel[] = [];

    async findById(id: number): Promise<TrainingModel | null> {
        return this.trainings.find(t => t.id === id) || null;
    }

    async findAllByUser(userId: number): Promise<TrainingModel[]> {
        return this.trainings;
    }

    async save(training: TrainingModel): Promise<TrainingModel> {
        const index = this.trainings.findIndex(t => t.id === training.id);
        if (index >= 0) {
            this.trainings[index] = training;
        } else {
            training.id = this.trainings.length + 1;
            this.trainings.push(training);
        }
        return training;
    }

    async delete(id: number): Promise<void> {
        const index = this.trainings.findIndex(t => t.id === id);
        if (index >= 0) {
            this.trainings.splice(index, 1);
        }
    }

    // Вспомогательные методы для тестов
    addTraining(training: TrainingModel): void {
        this.trainings.push(training);
    }

    clear(): void {
        this.trainings = [];
    }
} 