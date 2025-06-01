import {LivingResponseDto} from "./living-response.dto";

export interface PropertyResponseDto {
    totalArea: number;
    location: string;
    living: LivingResponseDto;
}
