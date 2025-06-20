import {AdvertisementStatus, RentType} from "@rent/shared";

export interface UpdateAdvertisementRequestDto {
    /**
     * @isString
     * @minLength 5
     * @maxLength 100
     */
    title?: string;

    /**
     * @isString
     * @minLength 10
     * @maxLength 2000
     */
    description?: string;

    /**
     * @isEnum RentType
     */
    rentType?: RentType;

    /**
     * @isEnum AdvertisementStatus
     */
    status?: AdvertisementStatus;

    /**
     * @isNumber
     * @minimum 0
     */
    pricePerPeriod?: number;

    /**
     * @isNumber
     * @minimum 0
     */
    commission?: number;

    /**
     * @isNumber
     * @minimum 0
     */
    deposit?: number;
}
