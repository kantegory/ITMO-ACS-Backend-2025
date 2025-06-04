import { CoachModel } from '../../../application/domain/coach.model';
import { BaseFakeRepository } from './base.repository';
import { CoachRepository } from '../interfaces/coach.repository';
import { AthleteModel } from '../../../application/domain/athlete.model';

export class FakeCoachRepository extends BaseFakeRepository<CoachModel> implements CoachRepository {
    async findByUserId(userId: number): Promise<CoachModel | null> {
        return this.items.find(coach => coach.user.id === userId) || null;
    }

    async findByAthlete(athlete: AthleteModel): Promise<CoachModel[]> {
        return this.items.filter(coach => coach.athletes.includes(athlete));
    }
} 