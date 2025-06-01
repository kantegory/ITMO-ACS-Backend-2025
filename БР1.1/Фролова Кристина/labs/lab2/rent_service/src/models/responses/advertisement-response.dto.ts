import {AdvertisementStatus} from "../enums/advertisment.status";
import {RentType} from "../enums/rent.type";
import {UserResponseDto} from "./user-response.dto";
import {CategoryResponseDto} from "./category-response.dto";
import {PhotoResponseDto} from "./photo-response.dto";
import {PropertyResponseDto} from "./property-response.dto";
import {RulesResponseDto} from "./rules-response.dto";

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

    owner: UserResponseDto;
    category: CategoryResponseDto;

    property?: PropertyResponseDto;
    rules?: RulesResponseDto;
    photos?: PhotoResponseDto[];
}
