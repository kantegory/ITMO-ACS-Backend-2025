import { IsString, Length, IsOptional } from "class-validator";

export class IngredientUpdateDto {
    @IsString()
    @Length(1, 100)
    @IsOptional()
    name?: string;

    @IsString()
    @Length(1, 1000)
    @IsOptional()
    description?: string;
}
