import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateFavoriteDto {
    @IsInt()
    @IsNotEmpty()
    propertyId?: number;
}

export class UpdateFavoriteDto {
    @IsInt()
    @IsOptional()
    propertyId?: number;
}
