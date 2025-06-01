import {Advertisement} from "./advertisement.model";

export interface Rules {
    id: number;
    advertisement?: Advertisement;
    checkInAfter: Date;
    departureBefore: Date;
    guestCount: number;
    withChildren: boolean;
    withAnimals: boolean;
    allowedSmoking: boolean;
    allowedParties: boolean;
    report_docs: boolean;
}