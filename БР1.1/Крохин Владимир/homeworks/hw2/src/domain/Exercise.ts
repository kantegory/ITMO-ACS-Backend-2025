import { Target } from "./Target";

export class Exercise {
    constructor(
        public weaponType: string,
        public target: Target,
        public shots: number,
        public shotsInSeries: number,
        public duration: number,
        public description: string
    ) {}
}