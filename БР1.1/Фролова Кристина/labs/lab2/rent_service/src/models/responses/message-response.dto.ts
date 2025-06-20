import {UserResponseDto} from "./user-response.dto";
import {AdvertisementResponseDto} from "./advertisement-response.dto";

export interface MessageResponseDto {
    id: number;
    sender: UserResponseDto;
    receiver: UserResponseDto;
    advertisement: AdvertisementResponseDto;
    text: string;
    createdAt: Date;
}