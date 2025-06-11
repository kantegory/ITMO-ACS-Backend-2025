import { IsNumber } from 'class-validator';

export class CreateFavoriteDto {
    @IsNumber()
    propertyId!: number;
}

export class UpdateFavoriteDto {
    @IsNumber()
    propertyId!: number;
}