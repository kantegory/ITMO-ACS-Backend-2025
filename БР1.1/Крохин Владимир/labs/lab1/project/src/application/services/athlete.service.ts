import { AthleteModel } from '../domain/athlete.model';
import { CoachModel } from '../domain/coach.model';
import { UserModel } from '../domain/user.model';

export class AthleteService {
    createAthlete(user: UserModel): AthleteModel {
        const athlete = new AthleteModel(0, user); // id будет установлен при сохранении в БД
        return athlete;
    }

    addCoach(athlete: AthleteModel, coach: CoachModel): void {
        athlete.assignCoach(coach);
    }

    removeCoach(athlete: AthleteModel, coach: CoachModel): void {
        athlete.unassignCoach(coach);
    }

    calculateStatistics(athlete: AthleteModel): {
        totalTrainings: number;
        totalCoaches: number;
        averageScore: number;
        bestScore: number;
        worstScore: number;
    } {
        const trainings = athlete.trainings;
        if (trainings.length === 0) {
            return {
                totalTrainings: 0,
                totalCoaches: athlete.coaches.length,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            };
        }

        const scores = trainings.flatMap(t => 
            t.getSeries().flatMap(s => s.allShots.map(shot => shot.score))
        );

        return {
            totalTrainings: trainings.length,
            totalCoaches: athlete.coaches.length,
            averageScore: scores.length > 0 
                ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
                : 0,
            bestScore: scores.length > 0 ? Math.max(...scores) : 0,
            worstScore: scores.length > 0 ? Math.min(...scores) : 0
        };
    }
} 