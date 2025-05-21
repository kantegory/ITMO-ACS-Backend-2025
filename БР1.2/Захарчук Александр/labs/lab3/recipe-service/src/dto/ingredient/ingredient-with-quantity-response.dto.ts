import { IsEnum, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Unit } from '../../enums/unit.enum';

class IngredientInfoDto {
  @IsNumber()
  ingredient_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class IngredientWithQuantityResponseDto {
  @ValidateNested()
  @Type(() => IngredientInfoDto)
  ingredient: IngredientInfoDto;

  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @IsEnum(Unit)
  unit: Unit;
}
