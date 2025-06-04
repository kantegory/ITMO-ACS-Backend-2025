import { QualificationTrainingModel } from '../../../application/domain/qualification-training.model';
import { ExerciseModel } from '../../../application/domain/exercise.model';
import { SeriesModel } from '../../../application/domain/series.model';

describe('QualificationTrainingModel', () => {
    let qualificationTrainingModel: QualificationTrainingModel;
    let exerciseModel: ExerciseModel;
    let startDate: Date;

    beforeEach(() => {
        startDate = new Date();
        exerciseModel = new ExerciseModel(1, 'Тестовое упражнение', 'Описание упражнения', 5);
        qualificationTrainingModel = new QualificationTrainingModel(1, startDate, exerciseModel);
    });

    describe('конструктор', () => {
        it('должен создавать квалификационную тренировку с корректными данными', () => {
            expect(qualificationTrainingModel.id).toBe(1);
            expect(qualificationTrainingModel.startTimeStamp).toBe(startDate);
            expect(qualificationTrainingModel.exercise).toBe(exerciseModel);
            expect(qualificationTrainingModel.getSeries()).toEqual([]);
        });
    });

    describe('добавление серии', () => {
        it('должен корректно добавлять серию с ограничением из упражнения', () => {
            const series = qualificationTrainingModel.addSeries(0);
            expect(series).toBeInstanceOf(SeriesModel);
            expect(qualificationTrainingModel.getSeries()).toContain(series);
            expect(series.beginTimeOffset).toBe(0);
            expect(series.maxShots).toBe(exerciseModel.shotsInSeries);
        });

        it('должен добавлять серии с разными временными смещениями', () => {
            const series1 = qualificationTrainingModel.addSeries(0);
            const series2 = qualificationTrainingModel.addSeries(300);
            expect(qualificationTrainingModel.getSeries().length).toBe(2);
            expect(series1.beginTimeOffset).toBe(0);
            expect(series2.beginTimeOffset).toBe(300);
            expect(series1.maxShots).toBe(exerciseModel.shotsInSeries);
            expect(series2.maxShots).toBe(exerciseModel.shotsInSeries);
        });
    });

    describe('свойства', () => {
        it('должен иметь доступ к упражнению', () => {
            expect(qualificationTrainingModel.exercise).toBe(exerciseModel);
            expect(qualificationTrainingModel.exercise.name).toBe('Тестовое упражнение');
            expect(qualificationTrainingModel.exercise.description).toBe('Описание упражнения');
            expect(qualificationTrainingModel.exercise.shotsInSeries).toBe(5);
        });
    });
}); 