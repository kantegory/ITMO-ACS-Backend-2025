import {AppDataSource} from '../config/data-source';
import {Post} from '../models/Post';
import {User} from '../models/User';
import {Recipe} from '../models/Recipe';
import {PostImage} from '../models/PostImage';
import {PostToRecipe} from '../models/PostToRecipe';
import {CreatePostDTO, UpdatePostDTO,} from '../dtos/post.dto';
import {PostFavorite} from "../models/PostFavorite";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const recipeRepository = AppDataSource.getRepository(Recipe);
const postImageRepository = AppDataSource.getRepository(PostImage);
const postToRecipeRepository = AppDataSource.getRepository(PostToRecipe);
const postFavoriteRepository = AppDataSource.getRepository(PostFavorite);

export async function getAllPosts(): Promise<Post[]> {
    return postRepository.find({
        relations: ['author', 'images', 'postRecipes', 'postRecipes.recipe'],
    });
}

export async function getUserFavoritePosts(userId: number): Promise<Post[]> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const favorites = await postFavoriteRepository.find({
        where: { user: { id: userId } },
        relations: ['post', 'post.author', 'post.images', 'post.postRecipes', 'post.postRecipes.recipe'],
    });
    return favorites.map(fav => fav.post);
}

export async function getPostById(id: number): Promise<Post | null> {
    return postRepository.findOne({
        where: {id},
        relations: ['author', 'images', 'postRecipes', 'postRecipes.recipe'],
    });
}

export async function createPost(
    data: CreatePostDTO
): Promise<Post> {
    const author = await userRepository.findOne({where: {id: data.authorId}});
    if (!author) {
        throw new Error('Author not found');
    }

    const post = postRepository.create({
        title: data.title,
        content: data.content,
        author,
    });
    const saved = await postRepository.save(post);

    if (data.imageUrls) {
        await Promise.all(
            data.imageUrls.map(async (url, idx) => {
                const img = postImageRepository.create({
                    imageUrl: url,
                    displayOrder: idx,
                    post: saved,
                });
                await postImageRepository.save(img);
            })
        );
    }

    if (data.recipeIds) {
        for (let i = 0; i < data.recipeIds.length; i++) {
            const recipeId = data.recipeIds[i];
            const recipe = await recipeRepository.findOne({where: {id: recipeId}});
            if (!recipe) {
                throw new Error(`Recipe not found: ${recipeId}`);
            }
            const ptr = postToRecipeRepository.create({
                recipe,
                post: saved,
                displayOrder: i,
            });
            await postToRecipeRepository.save(ptr);
        }
    }

    return (await getPostById(saved.id)) as Post;
}

export async function updatePost(
    id: number,
    updates: UpdatePostDTO
): Promise<Post | null> {
    const post = await postRepository.findOne({
        where: {id},
        relations: ['author', 'images', 'postRecipes'],
    });
    if (!post) {
        return null;
    }

    if (updates.title !== undefined) post.title = updates.title;
    if (updates.content !== undefined) post.content = updates.content;
    post.updatedAt = new Date();
    await postRepository.save(post);

    if (updates.imageUrls) {
        await postImageRepository.delete({post: {id}});
        await Promise.all(
            updates.imageUrls.map(async (url, idx) => {
                const img = postImageRepository.create({
                    imageUrl: url,
                    displayOrder: idx,
                    post,
                });
                await postImageRepository.save(img);
            })
        );
    }

    if (updates.recipeIds) {
        await postToRecipeRepository.delete({post: {id}});
        for (let i = 0; i < updates.recipeIds.length; i++) {
            const recipeId = updates.recipeIds[i];
            const recipe = await recipeRepository.findOne({where: {id: recipeId}});
            if (!recipe) {
                throw new Error(`Recipe not found: ${recipeId}`);
            }
            const ptr = postToRecipeRepository.create({
                recipe,
                post,
                displayOrder: i,
            });
            await postToRecipeRepository.save(ptr);
        }
    }

    return (await getPostById(id)) as Post;
}

export async function deletePost(id: number): Promise<boolean> {
    const res = await postRepository.delete(id);
    return (res.affected ?? 0) > 0;
}

export async function setPostFavorite(
    userId: number,
    postId: number,
    isFavorite: boolean
): Promise<void> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const post = await postRepository.findOne({ where: { id: postId } });
    if (!post) throw new Error('Post not found');
    const existing = await postFavoriteRepository.findOne({
        where: { user: { id: userId }, post: { id: postId } },
    });
    if (isFavorite) {
        if (!existing) {
            await postFavoriteRepository.save(
                postFavoriteRepository.create({ user, post })
            );
        }
    } else {
        if (existing) {
            await postFavoriteRepository.delete(existing.id);
        }
    }
}