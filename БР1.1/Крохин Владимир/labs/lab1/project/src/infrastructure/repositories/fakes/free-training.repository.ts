import { FreeTrainingModel } from '../../../application/domain/free-training.model';
import { BaseFakeRepository } from './base.repository';
import { FreeTrainingRepository } from '../interfaces/free-training.repository';

export class FakeFreeTrainingRepository extends BaseFakeRepository<FreeTrainingModel> implements FreeTrainingRepository {
    async findAllByUser(userId: number): Promise<FreeTrainingModel[]> {
        return this.items.filter(training => (training as any).userId === userId);
    }
} 