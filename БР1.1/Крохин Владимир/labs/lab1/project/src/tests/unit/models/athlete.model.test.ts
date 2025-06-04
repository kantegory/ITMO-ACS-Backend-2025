import { AthleteModel } from '../../../application/domain/athlete.model';
import { CoachModel } from '../../../application/domain/coach.model';
import { TrainingModel } from '../../../application/domain/training.model';
import { UserModel } from '../../../application/domain/user.model';

describe('AthleteModel', () => {
    let athleteModel: AthleteModel;
    let userModel: UserModel;
    let coachModel: CoachModel;
    let trainingModel: TrainingModel;

    beforeEach(() => {
        userModel = new UserModel(null, 'athlete1', 'password123');
        athleteModel = new AthleteModel(userModel);
        
        const coachUser = new UserModel(null, 'coach1', 'password123');
        coachModel = new CoachModel(1, coachUser);
        
        trainingModel = new TrainingModel(null, new Date());
    });

    describe('тренеры', () => {
        it('должен инициализироваться с пустым массивом тренеров', () => {
            expect(athleteModel.coaches).toEqual([]);
        });

        it('должен корректно добавлять тренера', () => {
            athleteModel.addCoach(coachModel);
            expect(athleteModel.coaches).toContain(coachModel);
            expect(coachModel.athletes).toContain(athleteModel);
        });

        it('не должен добавлять дубликат тренера', () => {
            athleteModel.addCoach(coachModel);
            athleteModel.addCoach(coachModel);
            expect(athleteModel.coaches.length).toBe(1);
        });

        it('должен корректно удалять тренера', () => {
            athleteModel.addCoach(coachModel);
            athleteModel.removeCoach(coachModel);
            expect(athleteModel.coaches).not.toContain(coachModel);
            expect(coachModel.athletes).not.toContain(athleteModel);
        });

        it('не должен выбрасывать ошибку при удалении несуществующего тренера', () => {
            expect(() => {
                athleteModel.removeCoach(coachModel);
            }).not.toThrow();
        });
    });

    describe('тренировки', () => {
        it('должен инициализироваться с пустым массивом тренировок', () => {
            expect(athleteModel.trainings).toEqual([]);
        });

        it('должен корректно назначать тренировку', () => {
            athleteModel.assignTraining(trainingModel);
            expect(athleteModel.trainings).toContain(trainingModel);
        });

        it('должен корректно удалять тренировку', () => {
            athleteModel.assignTraining(trainingModel);
            athleteModel.removeTraining(trainingModel);
            expect(athleteModel.trainings).not.toContain(trainingModel);
        });

        it('не должен выбрасывать ошибку при удалении несуществующей тренировки', () => {
            expect(() => {
                athleteModel.removeTraining(trainingModel);
            }).not.toThrow();
        });
    });

    describe('назначение тренера', () => {
        it('должен корректно назначать тренера', () => {
            athleteModel.assignCoach(coachModel);
            expect(athleteModel.coaches).toContain(coachModel);
        });

        it('не должен добавлять дубликат тренера при назначении', () => {
            athleteModel.assignCoach(coachModel);
            athleteModel.assignCoach(coachModel);
            expect(athleteModel.coaches.length).toBe(1);
        });

        it('должен корректно отменять назначение тренера', () => {
            athleteModel.assignCoach(coachModel);
            athleteModel.unassignCoach(coachModel);
            expect(athleteModel.coaches).not.toContain(coachModel);
        });
    });
}); 