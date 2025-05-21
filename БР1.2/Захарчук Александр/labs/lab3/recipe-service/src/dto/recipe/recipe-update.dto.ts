import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IngredientWithQuantityDto } from '../ingredient/ingredient-with-quantity.dto';
import { DishType } from '../../enums/dish-type.enum';
import { DifficultyLevel } from '../../enums/difficulty-level.enum';

export class RecipeUpdateDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(DishType)
    dish_type?: DishType;

    @IsOptional()
    @IsEnum(DifficultyLevel)
    difficulty_level?: DifficultyLevel;

    @IsOptional()
    @IsInt()
    @Min(1)
    preparation_time?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    cooking_time?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IngredientWithQuantityDto)
    ingredients?: IngredientWithQuantityDto[];
}
