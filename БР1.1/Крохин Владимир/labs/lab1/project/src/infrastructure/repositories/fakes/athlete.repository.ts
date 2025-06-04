import { AthleteModel } from '../../../application/domain/athlete.model';
import { BaseFakeRepository } from './base.repository';
import { AthleteRepository } from '../interfaces/athlete.repository';

export class FakeAthleteRepository extends BaseFakeRepository<AthleteModel> implements AthleteRepository {
    async findByUserId(userId: number): Promise<AthleteModel | null> {
        return this.items.find(athlete => athlete.user.id === userId) || null;
    }
} 