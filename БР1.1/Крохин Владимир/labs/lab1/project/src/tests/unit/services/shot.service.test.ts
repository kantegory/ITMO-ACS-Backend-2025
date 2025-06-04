import { ShotService } from '../../../application/services/shot.service';
import { FakeShotRepository } from '../../../infrastructure/repositories/fakes/shot.repository';
import { ShotModel } from '../../../application/domain/shot.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { ShotDto } from '../../../dtos/shot/ShotDto';
import { TargetModel } from '../../../application/domain/target.model';

describe('ShotService', () => {
    let shotService: ShotService;
    let fakeShotRepository: FakeShotRepository;
    let series: SeriesModel;
    let shot: ShotModel;
    let target: TargetModel;

    beforeEach(() => {
        fakeShotRepository = new FakeShotRepository();
        shotService = new ShotService(fakeShotRepository);
        series = new SeriesModel(null, 0, 10);
        target = new TargetModel(1, 'Test Target', 'Test Description');
        shot = new ShotModel(1, 10, target);
    });

    describe('добавление выстрела', () => {
        it('должен добавлять выстрел и возвращать ShotDto', async () => {
            const shotDto: ShotDto = { id: null, x: 1, y: 2, score: 10, timeOffset: 100 };
            const result = await shotService.addShot(shotDto, series);
            expect(result).toBeDefined();
            expect(result.x).toBe(1);
            expect(result.y).toBe(2);
            expect(result.score).toBe(10);
            expect(result.timeOffset).toBe(100);
        });
    });

    describe('получение деталей выстрела', () => {
        let shotId: number;
        beforeEach(async () => {
            const saved = await fakeShotRepository.save(shot);
            shotId = saved.id!;
        });

        it('должен возвращать ShotDto по id', async () => {
            const result = await shotService.getShotDetails(shotId);
            expect(result).toBeDefined();
            expect(result!.id).toBe(shotId);
        });

        it('должен возвращать null, если выстрел не найден', async () => {
            const result = await shotService.getShotDetails(999);
            expect(result).toBeNull();
        });
    });

    describe('статистика по серии', () => {
        let seriesId: number;
        beforeEach(async () => {
            const savedSeries = await fakeShotRepository.save(shot);
            seriesId = 1; // В фейковом репозитории seriesId не используется, но для теста подставим 1
        });

        it('должен возвращать статистику для пустой серии', async () => {
            const stats = await shotService.getShotStatistics(999);
            expect(stats.averageScore).toBe(0);
            expect(stats.bestScore).toBe(0);
            expect(stats.worstScore).toBe(0);
            expect(stats.averageHitPoint).toEqual({ x: 0, y: 0 });
            expect(stats.averageHoleSize).toBe(0);
            expect(stats.accuracy).toBe(0);
        });
    });

    describe('createShot', () => {
        it('should create a new shot with provided score and target', () => {
            const score = 8;
            const newShot = shotService.createShot(score, target);

            expect(newShot).toBeInstanceOf(ShotModel);
            expect(newShot.score).toBe(score);
            expect(newShot.target).toBe(target);
        });
    });

    describe('updateShot', () => {
        it('should update shot score', () => {
            const newScore = 9;
            shotService.updateShot(shot, newScore);

            expect(shot.score).toBe(newScore);
        });

        it('should update shot target', () => {
            const newTarget = new TargetModel(2, 'New Target', 'New Description');
            shotService.updateShot(shot, undefined, newTarget);

            expect(shot.target).toBe(newTarget);
        });

        it('should update both score and target when both are provided', () => {
            const newScore = 7;
            const newTarget = new TargetModel(2, 'New Target', 'New Description');
            shotService.updateShot(shot, newScore, newTarget);

            expect(shot.score).toBe(newScore);
            expect(shot.target).toBe(newTarget);
        });

        it('should not update anything when no parameters are provided', () => {
            const initialScore = shot.score;
            const initialTarget = shot.target;

            shotService.updateShot(shot);

            expect(shot.score).toBe(initialScore);
            expect(shot.target).toBe(initialTarget);
        });
    });
}); 