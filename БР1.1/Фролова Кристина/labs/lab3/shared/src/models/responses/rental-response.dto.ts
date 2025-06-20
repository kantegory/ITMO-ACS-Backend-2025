import {UserResponseDto} from "./user-response.dto";
import {AdvertisementResponseDto} from "./advertisement-response.dto";

export interface RentalResponseDto {
    id: number;
    advertisement: AdvertisementResponseDto;
    renter: UserResponseDto;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}
