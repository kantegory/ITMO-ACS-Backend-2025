import { UserDto } from '../user/UserDto';
import { CoachDto } from '../coach/CoachDto';
import { TrainingDto } from '../training/TrainingDto';

export interface AthleteDto {
    id: number | null;
    user: UserDto;
    coaches: CoachDto[];
    trainings: TrainingDto[];
}

export interface AthleteStatisticsDto {
    totalTrainings: number;
    totalCoaches: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
} 