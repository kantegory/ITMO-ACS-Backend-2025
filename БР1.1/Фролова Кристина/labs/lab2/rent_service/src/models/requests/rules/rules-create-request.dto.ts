export interface CreateRulesRequestDto {

    /**
     * @isDate
     */
    checkInAfter: string;

    /**
     * @isDate
     */
    departureBefore: string;

    /**
     * @isInt
     * @minimum 1
     */
    guestCount: number;

    /**
     * @isBoolean
     */
    withChildren: boolean;

    /**
     * @isBoolean
     */
    withAnimals: boolean;

    /**
     * @isBoolean
     */
    allowedSmoking: boolean;

    /**
     * @isBoolean
     */
    allowedParties: boolean;

    /**
     * @isBoolean
     */
    report_docs: boolean;
}