export interface CreateRulesModel {
    checkInAfter: Date;
    departureBefore: Date;
    guestCount: number;
    withChildren: boolean;
    withAnimals: boolean;
    allowedSmoking: boolean;
    allowedParties: boolean;
    report_docs: boolean;
}
