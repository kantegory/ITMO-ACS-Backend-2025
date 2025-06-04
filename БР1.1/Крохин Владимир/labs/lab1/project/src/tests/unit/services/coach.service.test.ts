import { CoachService } from '../../../application/services/coach.service';
import { FakeCoachRepository } from '../../../infrastructure/repositories/fakes/coach.repository';
import { FakeAthleteRepository } from '../../../infrastructure/repositories/fakes/athlete.repository';
import { FakeTrainingRepository } from '../../../infrastructure/repositories/fakes/training.repository';
import { CoachModel } from '../../../application/domain/coach.model';
import { AthleteModel } from '../../../application/domain/athlete.model';
import { UserModel } from '../../../application/domain/user.model';
import { TrainingModel } from '../../../application/domain/training.model';
import { UserRole } from '../../../application/domain/user-role.enum';

describe('CoachService', () => {
    let coachService: CoachService;
    let fakeCoachRepository: FakeCoachRepository;
    let fakeAthleteRepository: FakeAthleteRepository;
    let fakeTrainingRepository: FakeTrainingRepository;
    let user: UserModel;
    let coach: CoachModel;
    let athlete: AthleteModel;

    beforeEach(() => {
        fakeCoachRepository = new FakeCoachRepository();
        fakeAthleteRepository = new FakeAthleteRepository();
        fakeTrainingRepository = new FakeTrainingRepository();
        coachService = new CoachService(fakeCoachRepository, fakeAthleteRepository, fakeTrainingRepository);
        user = new UserModel(1, 'coach', 'password', UserRole.COACH);
        coach = new CoachModel(1, user);
        athlete = new AthleteModel(2, new UserModel(2, 'athlete', 'password', UserRole.ATHLETE));
    });

    describe('createCoach', () => {
        it('should create a new coach with provided user', () => {
            const newCoach = coachService.createCoach(user);

            expect(newCoach).toBeInstanceOf(CoachModel);
            expect(newCoach.user).toBe(user);
            expect(newCoach.athletes).toEqual([]);
        });
    });

    describe('addAthlete', () => {
        it('should add an athlete to coach', () => {
            coachService.addAthlete(coach, athlete);

            expect(coach.athletes).toContain(athlete);
        });

        it('should not add the same athlete twice', () => {
            coachService.addAthlete(coach, athlete);
            coachService.addAthlete(coach, athlete);

            expect(coach.athletes).toHaveLength(1);
            expect(coach.athletes).toContain(athlete);
        });
    });

    describe('removeAthlete', () => {
        it('should remove an athlete from coach', () => {
            coachService.addAthlete(coach, athlete);
            coachService.removeAthlete(coach, athlete);

            expect(coach.athletes).not.toContain(athlete);
        });

        it('should not throw error when removing non-existent athlete', () => {
            expect(() => {
                coachService.removeAthlete(coach, athlete);
            }).not.toThrow();
        });
    });

    describe('calculateStatistics', () => {
        it('should calculate statistics for coach', () => {
            const athlete1 = new AthleteModel(3, new UserModel(3, 'athlete1', 'password', UserRole.ATHLETE));
            const athlete2 = new AthleteModel(4, new UserModel(4, 'athlete2', 'password', UserRole.ATHLETE));

            coachService.addAthlete(coach, athlete1);
            coachService.addAthlete(coach, athlete2);

            const stats = coachService.calculateStatistics(coach);

            expect(stats).toBeDefined();
            expect(stats.totalAthletes).toBe(2);
        });

        it('should return zero statistics for coach with no athletes', () => {
            const stats = coachService.calculateStatistics(coach);

            expect(stats).toBeDefined();
            expect(stats.totalAthletes).toBe(0);
        });
    });

    describe('получение тренера', () => {
        let coachId: number;

        beforeEach(async () => {
            const savedCoach = await fakeCoachRepository.save(coach);
            coachId = savedCoach.user.id!;
        });

        it('должен получать тренера по id', async () => {
            const coach = await coachService.getCoachById(coachId);
            expect(coach).toBeDefined();
            expect(coach.user.id).toBe(coachId);
            expect(coach.user.username).toBe('coach');
        });

        it('должен выбрасывать ошибку при получении несуществующего тренера', async () => {
            await expect(coachService.getCoachById(999))
                .rejects.toThrow('Тренер не найден');
        });
    });

    describe('спортсмены тренера', () => {
        let coachId: number;

        beforeEach(async () => {
            const savedCoach = await fakeCoachRepository.save(coach);
            coachId = savedCoach.user.id!;
        });

        it('должен получать список спортсменов тренера', async () => {
            const athletes = await coachService.getCoachAthletes(coachId);
            expect(Array.isArray(athletes)).toBe(true);
        });

        it('должен выбрасывать ошибку при получении спортсменов несуществующего тренера', async () => {
            await expect(coachService.getCoachAthletes(999))
                .rejects.toThrow('Тренер не найден');
        });
    });

    describe('статистика тренера', () => {
        let coachId: number;

        beforeEach(async () => {
            const savedCoach = await fakeCoachRepository.save(coach);
            coachId = savedCoach.user.id!;
        });

        it('должен получать статистику тренера без спортсменов', async () => {
            const stats = await coachService.getCoachStatistics(coachId);
            expect(stats.totalAthletes).toBe(0);
            expect(stats.totalTrainings).toBe(0);
            expect(stats.averageAthleteScore).toBe(0);
            expect(stats.bestAthleteScore).toBe(0);
            expect(stats.worstAthleteScore).toBe(0);
        });

        it('должен выбрасывать ошибку при получении статистики несуществующего тренера', async () => {
            await expect(coachService.getCoachStatistics(999))
                .rejects.toThrow('Тренер не найден');
        });
    });
}); 