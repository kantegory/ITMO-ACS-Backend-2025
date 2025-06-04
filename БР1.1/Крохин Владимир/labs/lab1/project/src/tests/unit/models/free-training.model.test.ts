import { FreeTrainingModel } from '../../../application/domain/free-training.model';
import { TargetModel } from '../../../application/domain/target.model';
import { SeriesModel } from '../../../application/domain/series.model';

describe('FreeTrainingModel', () => {
    let freeTrainingModel: FreeTrainingModel;
    let targetModel: TargetModel;
    let startDate: Date;

    beforeEach(() => {
        startDate = new Date();
        targetModel = new TargetModel(1, 'Тестовая мишень', 'Описание мишени');
        freeTrainingModel = new FreeTrainingModel(1, startDate, 'Пневматическая винтовка', targetModel);
    });

    describe('конструктор', () => {
        it('должен создавать свободную тренировку с корректными данными', () => {
            expect(freeTrainingModel.id).toBe(1);
            expect(freeTrainingModel.startTimeStamp).toBe(startDate);
            expect(freeTrainingModel.weaponType).toBe('Пневматическая винтовка');
            expect(freeTrainingModel.target).toBe(targetModel);
            expect(freeTrainingModel.getSeries()).toEqual([]);
        });
    });

    describe('добавление серии', () => {
        it('должен корректно добавлять серию', () => {
            const series = freeTrainingModel.addSeries(0);
            expect(series).toBeInstanceOf(SeriesModel);
            expect(freeTrainingModel.getSeries()).toContain(series);
            expect(series.beginTimeOffset).toBe(0);
        });

        it('должен корректно добавлять серию с максимальным количеством выстрелов', () => {
            const maxShots = 5;
            const series = freeTrainingModel.addSeries(0, maxShots);
            expect(series).toBeInstanceOf(SeriesModel);
            expect(freeTrainingModel.getSeries()).toContain(series);
            expect(series.beginTimeOffset).toBe(0);
            expect(series.maxShots).toBe(maxShots);
        });

        it('должен добавлять серии с разными временными смещениями', () => {
            const series1 = freeTrainingModel.addSeries(0);
            const series2 = freeTrainingModel.addSeries(300);
            expect(freeTrainingModel.getSeries().length).toBe(2);
            expect(series1.beginTimeOffset).toBe(0);
            expect(series2.beginTimeOffset).toBe(300);
        });
    });

    describe('свойства', () => {
        it('должен иметь доступ к типу оружия', () => {
            expect(freeTrainingModel.weaponType).toBe('Пневматическая винтовка');
        });

        it('должен иметь доступ к мишени', () => {
            expect(freeTrainingModel.target).toBe(targetModel);
            expect(freeTrainingModel.target.name).toBe('Тестовая мишень');
            expect(freeTrainingModel.target.description).toBe('Описание мишени');
        });
    });
}); 