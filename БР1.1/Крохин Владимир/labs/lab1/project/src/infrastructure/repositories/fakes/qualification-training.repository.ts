import { QualificationTrainingModel } from '../../../application/domain/qualification-training.model';
import { BaseFakeRepository } from './base.repository';
import { QualificationTrainingRepository } from '../interfaces/qualification-training.repository';

export class FakeQualificationTrainingRepository extends BaseFakeRepository<QualificationTrainingModel> implements QualificationTrainingRepository {
    async findAllByUser(userId: number): Promise<QualificationTrainingModel[]> {
        return this.items.filter(training => (training as any).userId === userId);
    }
} 