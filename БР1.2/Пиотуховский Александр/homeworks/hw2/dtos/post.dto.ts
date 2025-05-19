export interface PostImageResponseDTO {
    id: number;
    imageUrl: string;
    displayOrder: number;
}

export interface PostRecipeResponseDTO {
    recipeId: number;
    displayOrder: number;
}

export interface PostResponseDTO {
    id: number;
    authorId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    images: PostImageResponseDTO[];
    recipes: PostRecipeResponseDTO[];
}

export interface CreatePostDTO {
    authorId: number;
    title: string;
    content: string;
    imageUrls?: string[];
    recipeIds?: number[];
}

export interface UpdatePostDTO {
    title?: string;
    content?: string;
    imageUrls?: string[];
    recipeIds?: number[];
}