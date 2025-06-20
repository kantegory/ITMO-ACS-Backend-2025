import {CreatePropertyRequestDto} from "../property/property-create-request.dto";
import {CreateRulesRequestDto} from "../rules/rules-create-request.dto";
import {CreatePhotoRequestDto} from "../photo/photo-create-request.dto";
import {RentType} from "../../enums/rent.type";

export interface CreateAdvertisementRequestDto {
    /**
     * @isString
     * @minLength 5
     * @maxLength 100
     */
    title: string;

    /**
     * @isString
     * @minLength 10
     * @maxLength 2000
     */
    description: string;

    /**
     * @isInt
     * @minimum 1
     */
    categoryId: number;

    /**
     * @isEnum RentType
     */
    rentType: RentType;

    /**
     * @isNumber
     * @minimum 0
     */
    pricePerPeriod: number;

    /**
     * @isNumber
     * @minimum 0
     */
    commission: number;

    /**
     * @isNumber
     * @minimum 0
     */
    deposit: number;

    /**
     * @isInt
     * @minimum 1
     */
    ownerId: number;

    property: CreatePropertyRequestDto;
    rules: CreateRulesRequestDto;
    photos: CreatePhotoRequestDto[];
}
