import { TrainingRepository } from '../repositories/interfaces/training.repository';
import { TrainingStatisticsService } from '../../application/services/training_statistics.service';
import { TrainingModel } from '../../application/domain/training.model';

export class TrainingStatisticsInfrastructureService {
    constructor(
        private readonly trainingRepository: TrainingRepository,
        private readonly trainingStatisticsService: TrainingStatisticsService
    ) {}

    async getTrainingStatistics(trainingId: number) {
        const training = await this.trainingRepository.findById(trainingId);
        if (!training) {
            throw new Error('Training not found');
        }
        return this.trainingStatisticsService.calculateTrainingStatistics(training);
    }
} 