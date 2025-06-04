import { CoachModel } from '../domain/coach.model';
import { AthleteModel } from '../domain/athlete.model';
import { UserModel } from '../domain/user.model';

export class CoachService {
    createCoach(user: UserModel): CoachModel {
        const coach = new CoachModel(null, user); // id будет установлен при сохранении в БД
        return coach;
    }

    addAthlete(coach: CoachModel, athlete: AthleteModel): void {
        coach.assignAthlete(athlete);
    }

    removeAthlete(coach: CoachModel, athlete: AthleteModel): void {
        coach.unassignAthlete(athlete);
    }

    calculateStatistics(coach: CoachModel): {
        totalAthletes: number;
        totalTrainings: number;
        averageAthleteScore: number;
        bestAthleteScore: number;
        worstAthleteScore: number;
    } {
        const athletes = coach.athletes;
        if (athletes.length === 0) {
            return {
                totalAthletes: 0,
                totalTrainings: 0,
                averageAthleteScore: 0,
                bestAthleteScore: 0,
                worstAthleteScore: 0
            };
        }

        const allScores = athletes.flatMap(athlete => 
            athlete.trainings.flatMap(training => 
                training.getSeries().flatMap(series => 
                    series.allShots.map(shot => shot.score)
                )
            )
        );

        const allTrainings = athletes.flatMap(athlete => athlete.trainings);

        return {
            totalAthletes: athletes.length,
            totalTrainings: allTrainings.length,
            averageAthleteScore: allScores.length > 0 
                ? allScores.reduce((sum, score) => sum + score, 0) / allScores.length 
                : 0,
            bestAthleteScore: allScores.length > 0 ? Math.max(...allScores) : 0,
            worstAthleteScore: allScores.length > 0 ? Math.min(...allScores) : 0
        };
    }
} 