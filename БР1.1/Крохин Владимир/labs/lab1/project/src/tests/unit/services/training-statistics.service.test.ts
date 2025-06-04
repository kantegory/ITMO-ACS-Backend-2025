import { TrainingStatisticsService } from '../../../application/services/TrainingStatisticsService';
import { FakeTrainingRepository } from '../../../infrastructure/repositories/fakes/training-statistics.repository';
import { TrainingModel } from '../../../application/domain/training.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { ShotModel } from '../../../application/domain/shot.model';

describe('TrainingStatisticsService', () => {
    let trainingStatisticsService: TrainingStatisticsService;
    let fakeTrainingRepository: FakeTrainingRepository;

    beforeEach(() => {
        fakeTrainingRepository = new FakeTrainingRepository();
        trainingStatisticsService = new TrainingStatisticsService(fakeTrainingRepository);
    });

    describe('getTrainingStatistics', () => {
        it('should return empty statistics for non-existent training', async () => {
            await expect(trainingStatisticsService.getTrainingStatistics(999))
                .rejects.toThrow('Тренировка не найдена');
        });

        it('should return empty statistics for training without shots', async () => {
            const training = new TrainingModel(1, new Date());
            await fakeTrainingRepository.save(training);

            const statistics = await trainingStatisticsService.getTrainingStatistics(1);

            expect(statistics).toEqual({
                totalSeries: 0,
                totalShots: 0,
                averageScore: 0,
                averageHitPoint: 0,
                averageHoleSize: 0,
                bestScore: 0,
                worstScore: 0,
                completionRate: 0,
                averageSeriesPerTraining: 0
            });
        });

        it('should calculate statistics for training with shots', async () => {
            const training = new TrainingModel(1, new Date());
            const series = training.addSeries(0, 3);
            
            // Добавляем выстрелы с разными координатами и очками
            series.addShot(new ShotModel(1, 10, 10, 9, 0));
            series.addShot(new ShotModel(2, 20, 20, 8, 1));
            series.addShot(new ShotModel(3, 30, 30, 7, 2));
            
            await fakeTrainingRepository.save(training);

            const statistics = await trainingStatisticsService.getTrainingStatistics(1);

            expect(statistics).toEqual({
                totalSeries: 1,
                totalShots: 3,
                averageScore: 8, // (9 + 8 + 7) / 3
                averageHitPoint: 20, // (10 + 20 + 30) / 3
                averageHoleSize: expect.any(Number), // Диаметр круга, охватывающего все выстрелы
                bestScore: 9,
                worstScore: 7,
                completionRate: 0,
                averageSeriesPerTraining: 1
            });
        });

        it('should calculate completion rate for finished training', async () => {
            const training = new TrainingModel(1, new Date());
            training.endTimeStamp = new Date();
            await fakeTrainingRepository.save(training);

            const statistics = await trainingStatisticsService.getTrainingStatistics(1);

            expect(statistics.completionRate).toBe(1);
        });
    });

    describe('getUserTrainingStatistics', () => {
        it('should return empty statistics for user without trainings', async () => {
            const statistics = await trainingStatisticsService.getUserTrainingStatistics(1);

            expect(statistics).toEqual({
                totalTrainings: 0,
                averageScore: 0,
                averageHitPoint: 0,
                averageHoleSize: 0,
                bestScore: 0,
                worstScore: 0,
                completionRate: 0
            });
        });

        it('should calculate statistics for user with trainings', async () => {
            // Создаем первую тренировку
            const training1 = new TrainingModel(1, new Date());
            const series1 = training1.addSeries(0, 2);
            series1.addShot(new ShotModel(1, 10, 10, 9, 0));
            series1.addShot(new ShotModel(2, 20, 20, 8, 1));
            training1.endTimeStamp = new Date();
            await fakeTrainingRepository.save(training1);

            // Создаем вторую тренировку
            const training2 = new TrainingModel(2, new Date());
            const series2 = training2.addSeries(0, 2);
            series2.addShot(new ShotModel(3, 30, 30, 7, 0));
            series2.addShot(new ShotModel(4, 40, 40, 6, 1));
            await fakeTrainingRepository.save(training2);

            const statistics = await trainingStatisticsService.getUserTrainingStatistics(1);

            expect(statistics).toEqual({
                totalTrainings: 2,
                averageScore: 7.5, // (9 + 8 + 7 + 6) / 4
                averageHitPoint: 25, // (10 + 20 + 30 + 40) / 4
                averageHoleSize: expect.any(Number), // Диаметр круга, охватывающего все выстрелы
                bestScore: 9,
                worstScore: 6,
                completionRate: 0.5 // Одна из двух тренировок завершена
            });
        });
    });
}); 