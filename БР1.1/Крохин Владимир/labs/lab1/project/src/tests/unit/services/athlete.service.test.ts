import { AthleteService } from '../../../application/services/athlete.service';
import { FakeAthleteRepository } from '../../../infrastructure/repositories/fakes/athlete.repository';
import { FakeCoachRepository } from '../../../infrastructure/repositories/fakes/coach.repository';
import { FakeTrainingRepository } from '../../../infrastructure/repositories/fakes/training.repository';
import { AthleteModel } from '../../../application/domain/athlete.model';
import { CoachModel } from '../../../application/domain/coach.model';
import { UserModel } from '../../../application/domain/user.model';
import { TrainingModel } from '../../../application/domain/training.model';

describe('AthleteService', () => {
    let athleteService: AthleteService;
    let fakeAthleteRepository: FakeAthleteRepository;
    let fakeCoachRepository: FakeCoachRepository;
    let fakeTrainingRepository: FakeTrainingRepository;
    let user: UserModel;
    let athlete: AthleteModel;
    let coach: CoachModel;
    let training: TrainingModel;

    beforeEach(() => {
        fakeAthleteRepository = new FakeAthleteRepository();
        fakeCoachRepository = new FakeCoachRepository();
        fakeTrainingRepository = new FakeTrainingRepository();
        athleteService = new AthleteService(fakeAthleteRepository, fakeCoachRepository, fakeTrainingRepository);
        user = new UserModel(null, 'athleteuser', 'password123');
        athlete = new AthleteModel(user);
        coach = new CoachModel(1, new UserModel(null, 'coachuser', 'password123'));
        training = new TrainingModel(1, athlete);
    });

    describe('createAthlete', () => {
        it('should create a new athlete with provided user', () => {
            const newAthlete = athleteService.createAthlete(user);

            expect(newAthlete).toBeInstanceOf(AthleteModel);
            expect(newAthlete.user).toBe(user);
            expect(newAthlete.coaches).toEqual([]);
            expect(newAthlete.trainings).toEqual([]);
        });
    });

    describe('addCoach', () => {
        it('should add coach to athlete and assign athlete to coach', () => {
            athleteService.addCoach(athlete, coach);

            expect(athlete.coaches).toContain(coach);
            expect(coach.athletes).toContain(athlete);
        });

        it('should not add coach if already assigned', () => {
            athleteService.addCoach(athlete, coach);
            const initialCoaches = [...athlete.coaches];

            athleteService.addCoach(athlete, coach);

            expect(athlete.coaches).toEqual(initialCoaches);
        });
    });

    describe('removeCoach', () => {
        it('should remove coach from athlete and unassign athlete from coach', () => {
            athleteService.addCoach(athlete, coach);
            athleteService.removeCoach(athlete, coach);

            expect(athlete.coaches).not.toContain(coach);
            expect(coach.athletes).not.toContain(athlete);
        });

        it('should not throw error when removing non-assigned coach', () => {
            expect(() => {
                athleteService.removeCoach(athlete, coach);
            }).not.toThrow();
        });
    });

    describe('calculateStatistics', () => {
        it('should calculate correct statistics for athlete', () => {
            athleteService.addCoach(athlete, coach);
            athlete.assignTraining(training);

            const stats = athleteService.calculateStatistics(athlete);

            expect(stats).toEqual({
                totalTrainings: 1,
                totalCoaches: 1,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            });
        });

        it('should return zero statistics for new athlete', () => {
            const stats = athleteService.calculateStatistics(athlete);

            expect(stats).toEqual({
                totalTrainings: 0,
                totalCoaches: 0,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            });
        });
    });

    describe('получение спортсмена', () => {
        let athleteId: number;

        beforeEach(async () => {
            const savedAthlete = await fakeAthleteRepository.save(athlete);
            athleteId = savedAthlete.user.id!;
        });

        it('должен получать спортсмена по id', async () => {
            const athlete = await athleteService.getAthleteById(athleteId);
            expect(athlete).toBeDefined();
            expect(athlete.user.id).toBe(athleteId);
            expect(athlete.user.username).toBe('athleteuser');
        });

        it('должен выбрасывать ошибку при получении несуществующего спортсмена', async () => {
            await expect(athleteService.getAthleteById(999))
                .rejects.toThrow('Спортсмен не найден');
        });
    });

    describe('управление тренерами', () => {
        let athleteId: number;
        let coachId: number;

        beforeEach(async () => {
            const savedAthlete = await fakeAthleteRepository.save(athlete);
            athleteId = savedAthlete.user.id!;

            const savedCoach = await fakeCoachRepository.save(coach);
            coachId = savedCoach.user.id!;
        });

        it('должен назначать тренера спортсмену', async () => {
            const athlete = await athleteService.assignCoach(athleteId, coachId);
            expect(athlete.coaches).toHaveLength(1);
            expect(athlete.coaches[0].user.id).toBe(coachId);
        });

        it('должен удалять тренера у спортсмена', async () => {
            await athleteService.assignCoach(athleteId, coachId);
            const athlete = await athleteService.removeCoach(athleteId, coachId);
            expect(athlete.coaches).toHaveLength(0);
        });

        it('должен выбрасывать ошибку при назначении несуществующего тренера', async () => {
            await expect(athleteService.assignCoach(athleteId, 999))
                .rejects.toThrow('Тренер не найден');
        });

        it('должен выбрасывать ошибку при удалении несуществующего тренера', async () => {
            await expect(athleteService.removeCoach(athleteId, 999))
                .rejects.toThrow('Тренер не найден');
        });
    });

    describe('тренировки спортсмена', () => {
        let athleteId: number;

        beforeEach(async () => {
            const savedAthlete = await fakeAthleteRepository.save(athlete);
            athleteId = savedAthlete.user.id!;

            const savedTraining = await fakeTrainingRepository.save(training);
        });

        it('должен получать список тренировок спортсмена', async () => {
            const trainings = await athleteService.getAthleteTrainings(athleteId);
            expect(Array.isArray(trainings)).toBe(true);
        });

        it('должен выбрасывать ошибку при получении тренировок несуществующего спортсмена', async () => {
            await expect(athleteService.getAthleteTrainings(999))
                .rejects.toThrow('Спортсмен не найден');
        });
    });

    describe('статистика спортсмена', () => {
        let athleteId: number;

        beforeEach(async () => {
            const savedAthlete = await fakeAthleteRepository.save(athlete);
            athleteId = savedAthlete.user.id!;
        });

        it('должен получать статистику спортсмена без тренировок', async () => {
            const stats = await athleteService.getAthleteStatistics(athleteId);
            expect(stats.totalTrainings).toBe(0);
            expect(stats.totalCoaches).toBe(0);
            expect(stats.averageScore).toBe(0);
            expect(stats.bestScore).toBe(0);
            expect(stats.worstScore).toBe(0);
        });

        it('должен выбрасывать ошибку при получении статистики несуществующего спортсмена', async () => {
            await expect(athleteService.getAthleteStatistics(999))
                .rejects.toThrow('Спортсмен не найден');
        });
    });
}); 