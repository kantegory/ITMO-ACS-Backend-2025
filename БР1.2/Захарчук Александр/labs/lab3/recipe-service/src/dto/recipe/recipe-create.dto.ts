import {
  IsString,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { IngredientWithQuantityDto } from "../ingredient/ingredient-with-quantity.dto";
import { DishType } from "../../enums/dish-type.enum";
import { DifficultyLevel } from "../../enums/difficulty-level.enum";

export class RecipeCreateDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(DishType)
    dish_type: DishType;

    @IsEnum(DifficultyLevel)
    difficulty_level: DifficultyLevel;

    @IsInt()
    @Min(1)
    preparation_time: number;

    @IsInt()
    @Min(1)
    cooking_time: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IngredientWithQuantityDto)
    ingredients: IngredientWithQuantityDto[];
}
