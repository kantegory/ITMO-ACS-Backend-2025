export interface IngredientResponseDTO {
    id: number;
    name: string;
}

export interface CreateIngredientDTO {
    name: string;
}

export interface UpdateIngredientDTO {
    name?: string;
}