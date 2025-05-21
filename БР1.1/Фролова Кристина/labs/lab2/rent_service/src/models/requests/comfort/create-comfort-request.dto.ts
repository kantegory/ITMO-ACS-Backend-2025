export interface CreateComfortRequestDto {

    /**
     * @isString
     */
    renovation: string;

    /**
     * @isString
     */
    devices: string;

    /**
     * @isBoolean
     */
    internet: boolean;

    /**
     * @isBoolean
     */
    tv: boolean;

    /**
     * @isString
     */
    furniture: string;
}
