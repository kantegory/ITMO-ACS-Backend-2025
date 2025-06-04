import { TrainingModel } from '../domain/training.model';
import { SeriesModel } from '../domain/series.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';
import { ExerciseModel } from '../domain/exercise.model';
import { TargetModel } from '../domain/target.model';

export class TrainingService {
    createTraining(startTs: Date): TrainingModel {
        return new TrainingModel(null, startTs);
    }

    updateTraining(training: TrainingModel, endTs: Date): void {
        training.endTimeStamp = endTs;
    }

    calculateStatistics(training: TrainingModel): {
        totalShots: number;
        averageScore: number;
        bestScore: number;
        worstScore: number;
    } {
        const series = training.getSeries();
        const shots = series.reduce((acc, s) => [...acc, ...s.allShots], []);
        
        if (shots.length === 0) {
            return {
                totalShots: 0,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            };
        }

        const totalScore = shots.reduce((sum, shot) => sum + shot.score, 0);
        const scores = shots.map(shot => shot.score);

        return {
            totalShots: shots.length,
            averageScore: totalScore / shots.length,
            bestScore: Math.max(...scores),
            worstScore: Math.min(...scores)
        };
    }
} 