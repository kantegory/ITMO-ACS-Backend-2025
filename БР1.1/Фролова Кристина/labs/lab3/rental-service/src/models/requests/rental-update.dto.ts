export interface UpdateRentalRequestDto {

    /**
     * @isDate
     */
    startDate?: Date;

    /**
     * @isDate
     */
    endDate?: Date;

    /**
     * @isNumber
     * @minimum 0
     */
    totalPrice?: number;
}
