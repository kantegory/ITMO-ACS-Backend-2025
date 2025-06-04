import { FreeTrainingService } from '../../../application/services/FreeTrainingService';
import { FakeFreeTrainingRepository } from '../../../infrastructure/repositories/fakes/free-training.repository';
import { FakeWeaponTypeRepository } from '../../../infrastructure/repositories/fakes/weapon-type.repository';
import { FakeTargetRepository } from '../../../infrastructure/repositories/fakes/target.repository';
import { FreeTrainingModel } from '../../../application/domain/free-training.model';
import { UserModel } from '../../../application/domain/user.model';
import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';
import { TargetModel } from '../../../application/domain/target.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { NoteModel } from '../../../application/domain/note.model';

describe('FreeTrainingService', () => {
    let freeTrainingService: FreeTrainingService;
    let fakeFreeTrainingRepository: FakeFreeTrainingRepository;
    let fakeWeaponTypeRepository: FakeWeaponTypeRepository;
    let fakeTargetRepository: FakeTargetRepository;

    beforeEach(() => {
        fakeFreeTrainingRepository = new FakeFreeTrainingRepository();
        fakeWeaponTypeRepository = new FakeWeaponTypeRepository();
        fakeTargetRepository = new FakeTargetRepository();
        freeTrainingService = new FreeTrainingService(
            fakeFreeTrainingRepository,
            fakeWeaponTypeRepository,
            fakeTargetRepository
        );
    });

    describe('startTraining', () => {
        it('should create a new free training', async () => {
            const userId = 1;
            const weaponTypeId = 1;
            const targetId = 1;

            const weaponType = new WeaponTypeModel(weaponTypeId, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(targetId, 'Мишень 1', 'Описание мишени 1');

            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const training = await freeTrainingService.startTraining(userId, weaponTypeId, targetId);

            expect(training).toBeInstanceOf(FreeTrainingModel);
            expect(training.weaponType).toBeInstanceOf(WeaponTypeModel);
            expect(training.weaponType.id).toBe(weaponTypeId);
            expect(training.weaponType.name).toBe('Пистолет');
            expect(training.target).toBeInstanceOf(TargetModel);
            expect(training.target.id).toBe(targetId);
            expect(training.target.name).toBe('Мишень 1');
        });

        it('should throw error if weapon type not found', async () => {
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeTargetRepository.save(target);

            await expect(freeTrainingService.startTraining(1, 999, 1))
                .rejects.toThrow('Тип оружия не найден');
        });

        it('should throw error if target not found', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            await fakeWeaponTypeRepository.save(weaponType);

            await expect(freeTrainingService.startTraining(1, 1, 999))
                .rejects.toThrow('Мишень не найдена');
        });
    });

    describe('getTrainingById', () => {
        it('should return training by id', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const training = await freeTrainingService.startTraining(1, 1, 1);
            const foundTraining = await freeTrainingService.getTrainingById(training.id!);

            expect(foundTraining).toBeInstanceOf(FreeTrainingModel);
            expect(foundTraining.id).toBe(training.id);
        });

        it('should throw error if training not found', async () => {
            await expect(freeTrainingService.getTrainingById(999))
                .rejects.toThrow('Тренировка не найдена');
        });
    });

    describe('getUserTrainings', () => {
        it('should return all trainings for user', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const userId = 1;
            await freeTrainingService.startTraining(userId, 1, 1);
            await freeTrainingService.startTraining(userId, 1, 1);

            const trainings = await freeTrainingService.getUserTrainings(userId);

            expect(trainings).toHaveLength(2);
            expect(trainings[0]).toBeInstanceOf(FreeTrainingModel);
            expect(trainings[1]).toBeInstanceOf(FreeTrainingModel);
        });
    });

    describe('addSeries', () => {
        it('should add series to training', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const training = await freeTrainingService.startTraining(1, 1, 1);
            const maxShots = 10;

            const series = await freeTrainingService.addSeries(training.id!, maxShots);

            expect(series).toBeInstanceOf(SeriesModel);
            expect(series.maxShots).toBe(maxShots);
        });

        it('should throw error if training not found', async () => {
            await expect(freeTrainingService.addSeries(999, 10))
                .rejects.toThrow('Тренировка не найдена');
        });
    });

    describe('addNote', () => {
        it('should add note to training', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const training = await freeTrainingService.startTraining(1, 1, 1);
            const userId = 1;
            const content = 'Тестовая заметка';

            const note = await freeTrainingService.addNote(training.id!, userId, content);

            expect(note).toBeInstanceOf(NoteModel);
            expect(note.content).toBe(content);
            expect(note.user).toBeInstanceOf(UserModel);
            expect(note.user.id).toBe(userId);
        });

        it('should throw error if training not found', async () => {
            await expect(freeTrainingService.addNote(999, 1, 'Тестовая заметка'))
                .rejects.toThrow('Тренировка не найдена');
        });
    });

    describe('completeTraining', () => {
        it('should complete training', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeWeaponTypeRepository.save(weaponType);
            await fakeTargetRepository.save(target);

            const training = await freeTrainingService.startTraining(1, 1, 1);
            const completedTraining = await freeTrainingService.completeTraining(training.id!);

            expect(completedTraining).toBeInstanceOf(FreeTrainingModel);
            expect(completedTraining.endTimeStamp).toBeDefined();
        });

        it('should throw error if training not found', async () => {
            await expect(freeTrainingService.completeTraining(999))
                .rejects.toThrow('Тренировка не найдена');
        });
    });
}); 