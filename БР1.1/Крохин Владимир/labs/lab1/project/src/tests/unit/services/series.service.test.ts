import { SeriesService } from '../../../application/services/series.service';
import { FakeSeriesRepository } from '../../../infrastructure/repositories/fakes/series.repository';
import { SeriesModel } from '../../../application/domain/series.model';
import { UserModel } from '../../../application/domain/user.model';
import { ShotModel } from '../../../application/domain/shot.model';
import { TargetModel } from '../../../application/domain/target.model';

describe('SeriesService', () => {
    let seriesService: SeriesService;
    let fakeSeriesRepository: FakeSeriesRepository;
    let series: SeriesModel;
    let user: UserModel;
    let shot: ShotModel;
    let target: TargetModel;

    beforeEach(() => {
        fakeSeriesRepository = new FakeSeriesRepository();
        seriesService = new SeriesService(fakeSeriesRepository);
        series = new SeriesModel(null, 0, 10);
        user = new UserModel(null, 'user', 'password123');
        target = new TargetModel(1, 'Test Target', 'Test Description');
        shot = new ShotModel(1, 10, target);
    });

    describe('получение серии', () => {
        let seriesId: number;

        beforeEach(async () => {
            const savedSeries = await fakeSeriesRepository.save(series);
            seriesId = savedSeries.id!;
        });

        it('должен получать серию по id', async () => {
            const series = await seriesService.getSeriesById(seriesId);
            expect(series).toBeDefined();
            expect(series.id).toBe(seriesId);
        });

        it('должен выбрасывать ошибку при получении несуществующей серии', async () => {
            await expect(seriesService.getSeriesById(999))
                .rejects.toThrow('Серия не найдена');
        });
    });

    describe('добавление выстрела', () => {
        let seriesId: number;

        beforeEach(async () => {
            const savedSeries = await fakeSeriesRepository.save(series);
            seriesId = savedSeries.id!;
        });

        it('должен добавлять выстрел в серию', async () => {
            const x = 10;
            const y = 20;
            const score = 8;
            const timeOffset = 100;
            const updatedSeries = await seriesService.addShot(seriesId, x, y, score, timeOffset);
            expect(updatedSeries.shots).toHaveLength(1);
            expect(updatedSeries.shots[0].x).toBe(x);
            expect(updatedSeries.shots[0].y).toBe(y);
            expect(updatedSeries.shots[0].score).toBe(score);
            expect(updatedSeries.shots[0].timeOffset).toBe(timeOffset);
        });

        it('должен выбрасывать ошибку при добавлении выстрела в несуществующую серию', async () => {
            await expect(seriesService.addShot(999, 10, 20, 8, 100))
                .rejects.toThrow('Серия не найдена');
        });
    });

    describe('управление заметками', () => {
        let seriesId: number;

        beforeEach(async () => {
            const savedSeries = await fakeSeriesRepository.save(series);
            seriesId = savedSeries.id!;
        });

        it('должен добавлять заметку в серию', async () => {
            const content = 'Тестовая заметка';
            const updatedSeries = await seriesService.addNote(seriesId, user, content);
            expect(updatedSeries.notes).toHaveLength(1);
            expect(updatedSeries.notes[0].content).toBe(content);
            expect(updatedSeries.notes[0].userId).toBe(user.id);
        });

        it('должен удалять заметку из серии', async () => {
            const content = 'Тестовая заметка';
            const updatedSeries = await seriesService.addNote(seriesId, user, content);
            const noteId = updatedSeries.notes[0].id!;
            await expect(seriesService.removeNote(seriesId, noteId)).resolves.not.toThrow();
        });

        it('должен выбрасывать ошибку при добавлении заметки в несуществующую серию', async () => {
            await expect(seriesService.addNote(999, user, 'Тестовая заметка'))
                .rejects.toThrow('Серия не найдена');
        });
    });

    describe('статистика серии', () => {
        let seriesId: number;

        beforeEach(async () => {
            const savedSeries = await fakeSeriesRepository.save(series);
            seriesId = savedSeries.id!;
        });

        it('должен получать статистику пустой серии', async () => {
            const stats = await seriesService.getSeriesStatistics(seriesId);
            expect(stats.totalShots).toBe(0);
            expect(stats.averageScore).toBe(0);
            expect(stats.bestScore).toBe(0);
            expect(stats.worstScore).toBe(0);
            expect(stats.averagePoint).toEqual({ x: 0, y: 0 });
            expect(stats.completionRate).toBe(0);
        });

        it('должен получать статистику серии с выстрелами', async () => {
            await seriesService.addShot(seriesId, 10, 20, 8, 100);
            await seriesService.addShot(seriesId, 15, 25, 9, 200);
            const stats = await seriesService.getSeriesStatistics(seriesId);
            expect(stats.totalShots).toBe(2);
            expect(stats.averageScore).toBe(8.5);
            expect(stats.bestScore).toBe(9);
            expect(stats.worstScore).toBe(8);
            expect(stats.averagePoint).toEqual({ x: 12.5, y: 22.5 });
        });

        it('должен выбрасывать ошибку при получении статистики несуществующей серии', async () => {
            await expect(seriesService.getSeriesStatistics(999))
                .rejects.toThrow('Серия не найдена');
        });
    });

    describe('createSeries', () => {
        it('should create a new series', () => {
            const newSeries = seriesService.createSeries();

            expect(newSeries).toBeInstanceOf(SeriesModel);
            expect(newSeries.shots).toEqual([]);
        });
    });

    describe('addShot', () => {
        it('should add a shot to series', () => {
            seriesService.addShot(series, shot);

            expect(series.shots).toContain(shot);
        });

        it('should not add the same shot twice', () => {
            seriesService.addShot(series, shot);
            seriesService.addShot(series, shot);

            expect(series.shots).toHaveLength(1);
            expect(series.shots).toContain(shot);
        });
    });

    describe('removeShot', () => {
        it('should remove a shot from series', () => {
            seriesService.addShot(series, shot);
            seriesService.removeShot(series, shot);

            expect(series.shots).not.toContain(shot);
        });

        it('should not throw error when removing non-existent shot', () => {
            expect(() => {
                seriesService.removeShot(series, shot);
            }).not.toThrow();
        });
    });

    describe('calculateStatistics', () => {
        it('should calculate statistics for series with shots', () => {
            const shot1 = new ShotModel(2, 8, target);
            const shot2 = new ShotModel(3, 9, target);
            const shot3 = new ShotModel(4, 7, target);

            seriesService.addShot(series, shot1);
            seriesService.addShot(series, shot2);
            seriesService.addShot(series, shot3);

            const stats = seriesService.calculateStatistics(series);

            expect(stats).toBeDefined();
            expect(stats.totalShots).toBe(3);
            expect(stats.averageScore).toBe(8);
            expect(stats.bestScore).toBe(9);
            expect(stats.worstScore).toBe(7);
        });

        it('should return zero statistics for empty series', () => {
            const stats = seriesService.calculateStatistics(series);

            expect(stats).toBeDefined();
            expect(stats.totalShots).toBe(0);
            expect(stats.averageScore).toBe(0);
            expect(stats.bestScore).toBe(0);
            expect(stats.worstScore).toBe(0);
        });
    });
}); 