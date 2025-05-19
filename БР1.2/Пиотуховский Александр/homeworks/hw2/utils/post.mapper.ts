import { Post } from '../models/Post';
import {
    PostResponseDTO,
    PostImageResponseDTO,
    PostRecipeResponseDTO,
} from '../dtos/post.dto';

export function toPostResponseDTO(post: Post): PostResponseDTO {
    const images: PostImageResponseDTO[] =
        post.images?.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl,
            displayOrder: img.displayOrder,
        })) ?? [];

    const recipes: PostRecipeResponseDTO[] =
        post.postRecipes?.map((ptr) => ({
            recipeId: ptr.recipe.id,
            displayOrder: ptr.displayOrder,
        })) ?? [];

    return {
        id: post.id,
        authorId: post.author.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt ?? undefined,
        images,
        recipes,
    };
}