export interface CreateCountryHouseRequestDto {

    /**
     * @isNumber
     * @minimum 1
     */
    landArea: number;

    /**
     * @isString
     */
    communications: string;

    /**
     * @isString
     */
    recreations: string;
}