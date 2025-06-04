import { TrainingModel } from '../../application/domain/training.model';

export interface TrainingStatistics {
    totalSeries: number;
    totalShots: number;
    averageScore: number;
    averageHitPoint: number;
    bestScore: number;
    worstScore: number;
    completionRate: number;
}

export interface UserTrainingStatistics {
    totalTrainings: number;
    averageScore: number;
    bestTraining: TrainingModel | null;
    worstTraining: TrainingModel | null;
    completionRate: number;
} 