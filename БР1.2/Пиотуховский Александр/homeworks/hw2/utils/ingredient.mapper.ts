import { Ingredient } from '../models/Ingredient';
import { IngredientResponseDTO } from '../dtos/ingredient.dto';

export function toIngredientResponseDTO(ing: Ingredient): IngredientResponseDTO {
    return {
        id: ing.id,
        name: ing.name,
    };
}