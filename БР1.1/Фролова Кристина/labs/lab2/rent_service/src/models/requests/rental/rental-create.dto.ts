export interface CreateRentalRequestDto {
    /**
     * @isInt
     * @minimum 1
     */
    advertisementId: number;

    /**
     * @isDate
     */
    startDate: Date;

    /**
     * @isDate
     */
    endDate: Date;

    /**
     * @isInt
     * @minimum 1
     */
    renterId: number;

    /**
     * @isNumber
     * @minimum 0
     */
    totalPrice: number;
}
