import { ExerciseService } from '../../../application/services/exercise.service';
import { FakeExerciseRepository } from '../../../infrastructure/repositories/fakes/exercise.repository';
import { FakeTargetRepository } from '../../../infrastructure/repositories/fakes/target.repository';
import { ExerciseModel } from '../../../application/domain/exercise.model';
import { TargetModel } from '../../../application/domain/target.model';

describe('ExerciseService', () => {
    let exerciseService: ExerciseService;
    let fakeExerciseRepository: FakeExerciseRepository;
    let fakeTargetRepository: FakeTargetRepository;
    let targetId: number;
    let target: TargetModel;
    let exercise: ExerciseModel;

    beforeEach(async () => {
        fakeExerciseRepository = new FakeExerciseRepository();
        fakeTargetRepository = new FakeTargetRepository();
        exerciseService = new ExerciseService(fakeExerciseRepository, fakeTargetRepository);
        // Создаем мишень для тестов
        target = new TargetModel(null, 'Мишень1', 'Описание мишени');
        const savedTarget = await fakeTargetRepository.save(target);
        targetId = savedTarget.id!;
        exercise = new ExerciseModel(null, 'Упр1', target);
    });

    describe('создание упражнения', () => {
        it('должен создавать новое упражнение', async () => {
            const exercise = await exerciseService.createExercise('Упр1', 'Описание', 10, targetId);
            expect(exercise).toBeDefined();
            expect(exercise.name).toBe('Упр1');
            expect(exercise.description).toBe('Описание');
            expect(exercise.shotsInSeries).toBe(10);
            expect(exercise.target.id).toBe(targetId);
        });

        it('должен выбрасывать ошибку при создании упражнения с пустым именем', async () => {
            await expect(exerciseService.createExercise('', 'Описание', 10, targetId))
                .rejects.toThrow('Название упражнения не может быть пустым');
        });
    });

    describe('получение упражнения', () => {
        let exerciseId: number;
        beforeEach(async () => {
            const exercise = await exerciseService.createExercise('Упр2', 'Описание2', 5, targetId);
            exerciseId = exercise.id!;
        });

        it('должен получать упражнение по id', async () => {
            const exercise = await exerciseService.getExerciseById(exerciseId);
            expect(exercise).toBeDefined();
            expect(exercise.id).toBe(exerciseId);
        });

        it('должен выбрасывать ошибку при получении несуществующего упражнения', async () => {
            await expect(exerciseService.getExerciseById(999))
                .rejects.toThrow('Упражнение не найдено');
        });
    });

    describe('обновление упражнения', () => {
        let exerciseId: number;
        beforeEach(async () => {
            const exercise = await exerciseService.createExercise('Упр3', 'Описание3', 7, targetId);
            exerciseId = exercise.id!;
        });

        it('должен обновлять имя упражнения', async () => {
            const updated = await exerciseService.updateExercise(exerciseId, 'Новое имя', 'Описание3', 7, targetId);
            expect(updated.name).toBe('Новое имя');
        });

        it('должен выбрасывать ошибку при обновлении несуществующего упражнения', async () => {
            await expect(exerciseService.updateExercise(999, 'Имя', 'Описание', 5, targetId))
                .rejects.toThrow('Упражнение не найдено');
        });
    });

    describe('удаление упражнения', () => {
        let exerciseId: number;
        beforeEach(async () => {
            const exercise = await exerciseService.createExercise('Упр4', 'Описание4', 8, targetId);
            exerciseId = exercise.id!;
        });

        it('должен удалять упражнение', async () => {
            await expect(exerciseService.deleteExercise(exerciseId)).resolves.not.toThrow();
            await expect(exerciseService.getExerciseById(exerciseId))
                .rejects.toThrow('Упражнение не найдено');
        });

        it('должен выбрасывать ошибку при удалении несуществующего упражнения', async () => {
            await expect(exerciseService.deleteExercise(999))
                .rejects.toThrow('Упражнение не найдено');
        });
    });

    describe('createExercise', () => {
        it('should create a new exercise with provided name and target', () => {
            const name = 'New Exercise';
            const newExercise = exerciseService.createExercise(name, target);

            expect(newExercise).toBeInstanceOf(ExerciseModel);
            expect(newExercise.name).toBe(name);
            expect(newExercise.target).toBe(target);
        });
    });

    describe('updateExercise', () => {
        it('should update exercise name', () => {
            const newName = 'Updated Exercise';
            exerciseService.updateExercise(exercise, newName);

            expect(exercise.name).toBe(newName);
        });

        it('should update exercise target', () => {
            const newTarget = new TargetModel(2, 'New Target', 'New Description');
            exerciseService.updateExercise(exercise, undefined, newTarget);

            expect(exercise.target).toBe(newTarget);
        });

        it('should update both name and target when both are provided', () => {
            const newName = 'Updated Exercise';
            const newTarget = new TargetModel(2, 'New Target', 'New Description');
            exerciseService.updateExercise(exercise, newName, newTarget);

            expect(exercise.name).toBe(newName);
            expect(exercise.target).toBe(newTarget);
        });

        it('should not update anything when no parameters are provided', () => {
            const initialName = exercise.name;
            const initialTarget = exercise.target;

            exerciseService.updateExercise(exercise);

            expect(exercise.name).toBe(initialName);
            expect(exercise.target).toBe(initialTarget);
        });
    });
}); 