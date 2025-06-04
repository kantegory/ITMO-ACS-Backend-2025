import { QualificationTrainingService } from '../../../application/services/QualificationTrainingService';
import { FakeQualificationTrainingRepository } from '../../../infrastructure/repositories/fakes/qualification-training.repository';
import { FakeExerciseRepository } from '../../../infrastructure/repositories/fakes/exercise.repository';
import { QualificationTrainingModel } from '../../../application/domain/qualification-training.model';
import { UserModel } from '../../../application/domain/user.model';
import { ExerciseModel } from '../../../application/domain/exercise.model';
import { SeriesModel } from '../../../application/domain/series.model';
import { NoteModel } from '../../../application/domain/note.model';

describe('QualificationTrainingService', () => {
    let qualificationTrainingService: QualificationTrainingService;
    let fakeQualificationTrainingRepository: FakeQualificationTrainingRepository;
    let fakeExerciseRepository: FakeExerciseRepository;

    beforeEach(() => {
        fakeQualificationTrainingRepository = new FakeQualificationTrainingRepository();
        fakeExerciseRepository = new FakeExerciseRepository();
        qualificationTrainingService = new QualificationTrainingService(
            fakeQualificationTrainingRepository,
            fakeExerciseRepository
        );
    });

    describe('startTraining', () => {
        it('should create a new qualification training', async () => {
            const userId = 1;
            const exerciseId = 1;
            const exercise = new ExerciseModel(exerciseId, 'Test Exercise', 'Test Description', 10);
            await fakeExerciseRepository.save(exercise);

            const training = await qualificationTrainingService.startTraining(userId, exerciseId);

            expect(training).toBeInstanceOf(QualificationTrainingModel);
            expect(training.exercise).toBeInstanceOf(ExerciseModel);
            expect(training.exercise?.id).toBe(exerciseId);
            expect(training.exercise?.name).toBe('Test Exercise');
            expect(training.exercise?.description).toBe('Test Description');
            expect(training.exercise?.shotsInSeries).toBe(10);
        });

        it('should throw error if exercise not found', async () => {
            await expect(qualificationTrainingService.startTraining(1, 999))
                .rejects.toThrow('Exercise not found');
        });
    });

    describe('getTrainingById', () => {
        it('should return training by id', async () => {
            const exercise = new ExerciseModel(1, 'Test Exercise', 'Test Description', 10);
            await fakeExerciseRepository.save(exercise);
            const training = await qualificationTrainingService.startTraining(1, 1);
            const foundTraining = await qualificationTrainingService.getTrainingById(training.id!);

            expect(foundTraining).toBeInstanceOf(QualificationTrainingModel);
            expect(foundTraining.id).toBe(training.id);
        });

        it('should throw error if training not found', async () => {
            await expect(qualificationTrainingService.getTrainingById(999))
                .rejects.toThrow('Training not found');
        });
    });

    describe('getUserTrainings', () => {
        it('should return all trainings for user', async () => {
            const exercise1 = new ExerciseModel(1, 'Test Exercise 1', 'Test Description 1', 10);
            const exercise2 = new ExerciseModel(2, 'Test Exercise 2', 'Test Description 2', 20);
            await fakeExerciseRepository.save(exercise1);
            await fakeExerciseRepository.save(exercise2);

            const userId = 1;
            await qualificationTrainingService.startTraining(userId, 1);
            await qualificationTrainingService.startTraining(userId, 2);

            const trainings = await qualificationTrainingService.getUserTrainings(userId);

            expect(trainings).toHaveLength(2);
            expect(trainings[0]).toBeInstanceOf(QualificationTrainingModel);
            expect(trainings[1]).toBeInstanceOf(QualificationTrainingModel);
        });
    });

    describe('addSeries', () => {
        it('should add series to training', async () => {
            const exercise = new ExerciseModel(1, 'Test Exercise', 'Test Description', 10);
            await fakeExerciseRepository.save(exercise);
            const training = await qualificationTrainingService.startTraining(1, 1);
            const maxShots = 10;

            const series = await qualificationTrainingService.addSeries(training.id!, maxShots);

            expect(series).toBeInstanceOf(SeriesModel);
            expect(series.maxShots).toBe(maxShots);
        });

        it('should throw error if training not found', async () => {
            await expect(qualificationTrainingService.addSeries(999, 10))
                .rejects.toThrow('Training not found');
        });
    });

    describe('addNote', () => {
        it('should add note to training', async () => {
            const exercise = new ExerciseModel(1, 'Test Exercise', 'Test Description', 10);
            await fakeExerciseRepository.save(exercise);
            const training = await qualificationTrainingService.startTraining(1, 1);
            const userId = 1;
            const content = 'Тестовая заметка';

            const note = await qualificationTrainingService.addNote(training.id!, userId, content);

            expect(note).toBeInstanceOf(NoteModel);
            expect(note.content).toBe(content);
            expect(note.user).toBeInstanceOf(UserModel);
            expect(note.user.id).toBe(userId);
        });

        it('should throw error if training not found', async () => {
            await expect(qualificationTrainingService.addNote(999, 1, 'Тестовая заметка'))
                .rejects.toThrow('Training not found');
        });
    });

    describe('completeTraining', () => {
        it('should complete training', async () => {
            const exercise = new ExerciseModel(1, 'Test Exercise', 'Test Description', 10);
            await fakeExerciseRepository.save(exercise);
            const training = await qualificationTrainingService.startTraining(1, 1);
            const completedTraining = await qualificationTrainingService.completeTraining(training.id!);

            expect(completedTraining).toBeInstanceOf(QualificationTrainingModel);
            expect(completedTraining.endTimeStamp).toBeDefined();
        });

        it('should throw error if training not found', async () => {
            await expect(qualificationTrainingService.completeTraining(999))
                .rejects.toThrow('Training not found');
        });
    });
}); 