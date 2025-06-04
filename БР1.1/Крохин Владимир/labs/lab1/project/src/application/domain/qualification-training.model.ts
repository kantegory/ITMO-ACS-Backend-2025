import { TrainingModel } from './training.model';
import { ExerciseModel } from './exercise.model';
import { SeriesModel } from './series.model';

export class QualificationTrainingModel extends TrainingModel {
    constructor(id: number, startTs: Date, public exercise: ExerciseModel) {
        super(id, startTs);
    }

    // Создание серии с ограничением из Exercise
    addSeries(beginTimeOffset: number): SeriesModel {
        return super.addSeries(beginTimeOffset, this.exercise.shotsInSeries);
    }
} 