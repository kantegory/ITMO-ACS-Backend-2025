import { TrainingModel } from './training.model';
import { TargetModel } from './target.model';
import { SeriesModel } from './series.model';

export class FreeTrainingModel extends TrainingModel {
    constructor(id: number, startTs: Date, public weaponType: string, public target: TargetModel) {
        super(id, startTs);
    }

    addSeries(beginTimeOffset: number, maxShots?: number): SeriesModel {
        return super.addSeries(beginTimeOffset, maxShots);
    }
} 