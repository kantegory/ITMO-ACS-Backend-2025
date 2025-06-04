import { SeriesModel } from '../../../application/domain/series.model';
import { BaseFakeRepository } from './base.repository';
import { SeriesRepository } from '../interfaces/series.repository';

export class FakeSeriesRepository extends BaseFakeRepository<SeriesModel> implements SeriesRepository {
    async findAllByTraining(trainingId: number): Promise<SeriesModel[]> {
        return this.items.filter(series => (series as any).trainingId === trainingId);
    }
} 