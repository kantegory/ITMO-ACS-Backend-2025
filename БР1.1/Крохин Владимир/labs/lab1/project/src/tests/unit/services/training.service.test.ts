import { TrainingService } from '../../../application/services/training.service';
import { TrainingModel } from '../../../application/domain/training.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { NoteModel } from '../../../application/domain/note.model';
import { UserModel } from '../../../application/domain/user.model';
import { ExerciseModel } from '../../../application/domain/exercise.model';
import { TargetModel } from '../../../application/domain/target.model';

describe('TrainingService', () => {
    let trainingService: TrainingService;
    let training: TrainingModel;
    let user: UserModel;
    let exercise: ExerciseModel;
    let target: TargetModel;

    beforeEach(() => {
        trainingService = new TrainingService();
        user = new UserModel(1, 'testuser', 'password');
        exercise = new ExerciseModel(1, 'Test Exercise', 'Test Description');
        target = new TargetModel(1, 'Test Target', 'Test Description');
        training = new TrainingModel(1, new Date(), exercise);
    });

    describe('createTraining', () => {
        it('should create a new training', () => {
            const startTime = new Date();
            const newTraining = trainingService.createTraining(startTime);
            expect(newTraining).toBeInstanceOf(TrainingModel);
            expect(newTraining.startTimeStamp).toEqual(startTime);
            expect(newTraining.endTimeStamp).toBeNull();
        });
    });

    describe('updateTraining', () => {
        it('should update training end time', () => {
            const endTime = new Date();
            trainingService.updateTraining(training, endTime);
            expect(training.endTimeStamp).toEqual(endTime);
        });

        it('should not allow end time before start time', () => {
            const startTime = new Date();
            const endTime = new Date(startTime.getTime() - 1000);
            expect(() => {
                trainingService.updateTraining(training, endTime);
            }).toThrow('Время окончания не может быть раньше времени начала');
        });
    });

    describe('calculateStatistics', () => {
        it('should calculate correct statistics for training with shots', () => {
            const series = training.addSeries(0);
            series.addShot(1, 1, 10, 0);
            series.addShot(2, 2, 8, 1);
            series.addShot(3, 3, 9, 2);

            const stats = trainingService.calculateStatistics(training);
            expect(stats.totalShots).toBe(3);
            expect(stats.averageScore).toBe(9);
            expect(stats.bestScore).toBe(10);
            expect(stats.worstScore).toBe(8);
        });

        it('should return zero statistics for empty training', () => {
            const stats = trainingService.calculateStatistics(training);
            expect(stats.totalShots).toBe(0);
            expect(stats.averageScore).toBe(0);
            expect(stats.bestScore).toBe(0);
            expect(stats.worstScore).toBe(0);
        });
    });
}); 