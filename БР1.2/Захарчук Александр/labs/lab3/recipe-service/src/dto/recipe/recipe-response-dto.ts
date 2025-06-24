import { IngredientWithQuantityResponseDto } from '../ingredient/ingredient-with-quantity-response.dto';
import { IsString, IsInt, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { DishType } from '../../enums/dish-type.enum';
import { DifficultyLevel } from '../../enums/difficulty-level.enum';
import { Type } from 'class-transformer';

export class RecipeResponseDto {
  @IsInt()
  id: number;

  @IsInt()
  user_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(DishType)
  dish_type: DishType;

  @IsEnum(DifficultyLevel)
  difficulty_level: DifficultyLevel;
  
  @IsInt()
  preparation_time: number;

  @IsInt()
  cooking_time: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientWithQuantityResponseDto)
  ingredients: IngredientWithQuantityResponseDto[];
}
