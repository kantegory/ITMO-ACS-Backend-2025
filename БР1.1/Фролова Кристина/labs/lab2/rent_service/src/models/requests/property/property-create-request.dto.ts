import {CreateLivingRequestDto} from "../living/living-create-request.dto";

export interface CreatePropertyRequestDto {

    /**
     * @isNumber
     * @minimum 1
     */
    totalArea: number;

    /**
     * @isString
     * @minLength 3
     * @maxLength 100
     */
    location: string;

    living: CreateLivingRequestDto;
}