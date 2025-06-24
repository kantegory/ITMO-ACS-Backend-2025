export interface CreateFlatRequestDto {

    /**
     * @isInt
     * @minimum 1
     */
    floor: number;

    /**
     * @isNumber
     * @minimum 1
     */
    kitchenArea: number;

    /**
     * @isNumber
     * @minimum 1
     */
    livingArea: number;
}