import { IsNumber, IsInt, Min, IsEnum } from "class-validator";
import { Unit } from "../../enums/unit.enum";

export class IngredientWithQuantityDto {
    @IsInt()
    @Min(1)
    ingredient_id: number;

    @IsNumber()
    @Min(0.0001)
    quantity: number;

    @IsEnum(Unit)
    unit: Unit;
}
