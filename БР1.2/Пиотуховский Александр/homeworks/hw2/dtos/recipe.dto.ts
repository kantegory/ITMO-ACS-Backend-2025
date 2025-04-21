import { DishTypeResponseDTO } from './dishType.dto';
import { IngredientResponseDTO } from './ingredient.dto';
import { BlockTypeEnum } from '../models/enums';

export interface RecipeBlockResponseDTO {
    id: number;
    blockType: BlockTypeEnum;
    content: string;
    displayOrder: number;
}

export interface RecipeResponseDTO {
    id: number;
    authorId: number;
    title: string;
    description?: string;
    dishType: DishTypeResponseDTO;
    difficulty: number;
    createdAt: Date;
    updatedAt?: Date;
    ingredients: IngredientResponseDTO[];
    blocks: RecipeBlockResponseDTO[];
}

export interface CreateRecipeDTO {
    authorId: number;
    title: string;
    description?: string;
    dishTypeId: string;
    difficulty: number;
    ingredientIds?: number[];
    blocks?: Array<{ blockType: BlockTypeEnum; content: string }>;
}

export interface UpdateRecipeDTO {
    title?: string;
    description?: string;
    dishTypeId?: string;
    difficulty?: number;
    ingredientIds?: number[];
    blocks?: Array<{ blockType: BlockTypeEnum; content: string }>;
}
