import { UserDto } from '../user/UserDto';
import { AthleteDto } from '../athlete/AthleteDto';

export interface CoachDto {
    id: number | null;
    user: UserDto;
    athletes: AthleteDto[];
}

export interface CoachStatisticsDto {
    totalAthletes: number;
    totalTrainings: number;
    averageAthleteScore: number;
    bestAthleteScore: number;
    worstAthleteScore: number;
} 