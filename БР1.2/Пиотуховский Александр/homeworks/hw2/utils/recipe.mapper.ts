import { Recipe } from '../models/Recipe';
import { RecipeResponseDTO, RecipeBlockResponseDTO } from '../dtos/recipe.dto';
import { toDishTypeResponseDTO } from './dishType.mapper';
import { toIngredientResponseDTO } from './ingredient.mapper';

export function toRecipeResponseDTO(recipe: Recipe): RecipeResponseDTO {
    const ingredients =
        recipe.ingredients?.map((ri) => toIngredientResponseDTO(ri.ingredient)) ?? [];

    const blocks: RecipeBlockResponseDTO[] =
        recipe.blocks?.map((b) => ({
            id: b.id,
            blockType: b.blockType,
            content: b.content,
            displayOrder: b.displayOrder,
        })) ?? [];

    return {
        id: recipe.id,
        authorId: recipe.author.id,
        title: recipe.title,
        description: recipe.description ?? undefined,
        dishType: toDishTypeResponseDTO(recipe.dishType),
        difficulty: recipe.difficulty,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt ?? undefined,
        ingredients,
        blocks,
    };
}