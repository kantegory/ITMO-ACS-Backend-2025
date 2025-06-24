import { IsString, Length } from "class-validator";

export class IngredientCreateDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @Length(1, 1000)
    description: string;
}
