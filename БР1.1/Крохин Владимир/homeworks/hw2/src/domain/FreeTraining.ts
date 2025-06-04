import { Training } from "./Training";
import { Target } from "./Target";


export class FreeTraining extends Training {
    constructor(
        startTs: Date,
        public weaponType: string,
        public target: Target,
    ) {
        super(startTs);
    }

    addSeries(
        beginTimeOffset: number,
        endTimeOffset: number
    ): void {
        super.addSeries(beginTimeOffset, endTimeOffset);
    }
}