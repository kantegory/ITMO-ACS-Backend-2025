import { Training } from "./Training";
import { Exercise } from "./Exercise";

export class QualificationTraining extends Training {
    constructor(
        startTs: Date,
        public exercise: Exercise,
    ) {
        super(startTs);
    }

    // Создание серии с ограничением из Exercise
    addSeries(
        beginTimeOffset: number,
    ): void {
        super.addSeries(beginTimeOffset, this.exercise.shotsInSeries);
    }
}