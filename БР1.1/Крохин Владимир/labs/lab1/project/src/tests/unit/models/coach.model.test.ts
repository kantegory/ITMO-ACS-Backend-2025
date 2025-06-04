import { CoachModel } from '../../../application/domain/coach.model';
import { AthleteModel } from '../../../application/domain/athlete.model';
import { UserModel } from '../../../application/domain/user.model';

describe('CoachModel', () => {
    let coachModel: CoachModel;
    let userModel: UserModel;
    let athleteModel: AthleteModel;

    beforeEach(() => {
        userModel = new UserModel(null, 'coach1', 'password123');
        coachModel = new CoachModel(1, userModel);
        
        const athleteUser = new UserModel(null, 'athlete1', 'password123');
        athleteModel = new AthleteModel(athleteUser);
    });

    describe('конструктор', () => {
        it('должен создавать тренера с корректными данными', () => {
            expect(coachModel.id).toBe(1);
            expect(coachModel.user).toBe(userModel);
            expect(coachModel.athletes).toEqual([]);
        });
    });

    describe('спортсмены', () => {
        it('должен инициализироваться с пустым массивом спортсменов', () => {
            expect(coachModel.athletes).toEqual([]);
        });

        it('должен корректно добавлять спортсмена', () => {
            coachModel.addAthlete(athleteModel);
            expect(coachModel.athletes).toContain(athleteModel);
            expect(athleteModel.coaches).toContain(coachModel);
        });

        it('не должен добавлять дубликат спортсмена', () => {
            coachModel.addAthlete(athleteModel);
            coachModel.addAthlete(athleteModel);
            expect(coachModel.athletes.length).toBe(1);
        });

        it('должен корректно удалять спортсмена', () => {
            coachModel.addAthlete(athleteModel);
            coachModel.removeAthlete(athleteModel);
            expect(coachModel.athletes).not.toContain(athleteModel);
            expect(athleteModel.coaches).not.toContain(coachModel);
        });

        it('не должен выбрасывать ошибку при удалении несуществующего спортсмена', () => {
            expect(() => {
                coachModel.removeAthlete(athleteModel);
            }).not.toThrow();
        });
    });

    describe('назначение спортсмена', () => {
        it('должен корректно назначать спортсмена', () => {
            coachModel.assignAthlete(athleteModel);
            expect(coachModel.athletes).toContain(athleteModel);
        });

        it('не должен добавлять дубликат спортсмена при назначении', () => {
            coachModel.assignAthlete(athleteModel);
            coachModel.assignAthlete(athleteModel);
            expect(coachModel.athletes.length).toBe(1);
        });

        it('должен корректно отменять назначение спортсмена', () => {
            coachModel.assignAthlete(athleteModel);
            coachModel.unassignAthlete(athleteModel);
            expect(coachModel.athletes).not.toContain(athleteModel);
        });

        it('не должен выбрасывать ошибку при отмене назначения несуществующего спортсмена', () => {
            expect(() => {
                coachModel.unassignAthlete(athleteModel);
            }).not.toThrow();
        });
    });
}); 