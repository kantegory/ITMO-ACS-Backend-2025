import { ShotModel } from '../../../application/domain/shot.model';
import { BaseFakeRepository } from './base.repository';
import { ShotRepository } from '../interfaces/shot.repository';

export class FakeShotRepository extends BaseFakeRepository<ShotModel> implements ShotRepository {
    async findAllBySeries(seriesId: number): Promise<ShotModel[]> {
        return this.items.filter(shot => (shot as any).seriesId === seriesId);
    }
} 