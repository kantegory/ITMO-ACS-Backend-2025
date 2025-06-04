import { SeriesDto } from '../series/SeriesDto';
import { NoteDto } from '../note/NoteDto';

export interface TrainingDto {
    id: number | null;
    startTimeStamp: Date;
    endTimeStamp: Date | null;
    series: SeriesDto[];
    notes: NoteDto[];
    type: 'qualification' | 'free';
}

export interface TrainingStatisticsDto {
    // Статистика по конкретной тренировке
    totalSeries: number;
    totalShots: number;
    averageScore: number;
    averageHitPoint: number;
    averageHoleSize: number;
    bestScore: number;
    worstScore: number;
    completionRate: number;
    averageSeriesPerTraining: number;
}

export interface UserTrainingStatisticsDto {
    // Статистика по всем тренировкам пользователя
    totalTrainings: number;
    averageScore: number;
    averageHitPoint: number;
    averageHoleSize: number;
    bestScore: number;
    worstScore: number;
    completionRate: number;
} 