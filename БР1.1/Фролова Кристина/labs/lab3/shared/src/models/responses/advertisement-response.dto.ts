import {RentType} from "../enums";
import {UserResponseDto} from "./user-response.dto";
import {CategoryResponseDto} from "./category-response.dto";
import {PropertyResponseDto} from "./property-response.dto";
import {RulesResponseDto} from "./rules-response.dto";
import {PhotoResponseDto} from "./photo-response.dto";
import {AdvertisementStatus} from "../enums";

export interface AdvertisementResponseDto {
    id: number;
    title: string;
    description: string;
    status: AdvertisementStatus;
    rentType: RentType;
    createdAt: Date;
    pricePerPeriod: number;
    commission: number;
    deposit: number;

    ownerId: number;
    category: CategoryResponseDto;

    property?: PropertyResponseDto;
    rules?: RulesResponseDto;
    photos?: PhotoResponseDto[];
}
