import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Query,
    Request,
    Route,
    Security,
    Tags
} from 'tsoa';
import {Request as ExpressRequest} from 'express';
import {AppDataSource} from '../data-source';
import {Recipe} from '../models/Recipe';
import {User} from '../models/User';
import {Tag} from '../models/Tag';
import {CreateRecipeDto, RecipeResponseDto, UpdateRecipeDto} from '../dtos/RecipeDto';

@Route('recipes')
@Tags('Recipes')
export class RecipeController extends Controller {
    private recipeRepository = AppDataSource.getRepository(Recipe);
    private userRepository = AppDataSource.getRepository(User);
    private tagRepository = AppDataSource.getRepository(Tag);

    /**
     * Get all recipes with optional filtering
     */
    @Get()
    public async getRecipes(
        @Query() tagId?: number,
        @Query() authorId?: number
    ): Promise<RecipeResponseDto[]> {
        const queryBuilder = this.recipeRepository.createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.author', 'author')
            .leftJoinAndSelect('recipe.tags', 'tags')
            .leftJoinAndSelect('recipe.likes', 'likes')
            .leftJoinAndSelect('recipe.comments', 'comments');

        if (tagId) {
            queryBuilder.andWhere('tags.id = :tagId', {tagId});
        }

        if (authorId) {
            queryBuilder.andWhere('author.id = :authorId', {authorId});
        }

        const recipes = await queryBuilder.getMany();
        return recipes.map((recipe) => new RecipeResponseDto(recipe));
    }

    /**
     * Get a recipe by ID
     */
    @Get('{recipeId}')
    public async getRecipeById(@Path() recipeId: number): Promise<RecipeResponseDto> {
        const recipe = await this.recipeRepository.findOne({
            where: {id: recipeId},
            relations: ['author', 'tags', 'likes', 'comments'],
        });

        if (!recipe) {
            this.setStatus(404);
            throw new Error('Recipe not found');
        }

        return new RecipeResponseDto(recipe);
    }

    /**
     * Create a new recipe
     */
    @Post()
    @Security('jwt')
    public async createRecipe(
        @Request() request: ExpressRequest,
        @Body() requestBody: CreateRecipeDto
    ): Promise<RecipeResponseDto> {
        const userId = (request as any).user.id;

        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) {
            this.setStatus(404);
            throw new Error('User not found');
        }

        if (!requestBody.tagIds || requestBody.tagIds.length === 0) {
            this.setStatus(400);
            throw new Error('At least one tag must be specified');
        }

        const tags = await this.tagRepository.findByIds(requestBody.tagIds);

        if (tags.length !== requestBody.tagIds.length) {
            this.setStatus(404);
            throw new Error('One or more tags were not found');
        }

        const recipe = this.recipeRepository.create({
            title: requestBody.title,
            description: requestBody.description,
            ingredients: requestBody.ingredients,
            content: requestBody.content,
            author: user,
            tags: tags,
        });

        const savedRecipe = await this.recipeRepository.save(recipe);

        const recipeWithRelations = await this.recipeRepository.findOne({
            where: {id: savedRecipe.id},
            relations: ['author', 'tags', 'likes', 'comments'],
        });

        if (!recipeWithRelations) {
            this.setStatus(500);
            throw new Error('Failed to retrieve saved recipe');
        }

        return new RecipeResponseDto(recipeWithRelations);
    }

    /**
     * Update a recipe
     */
    @Put('{recipeId}')
    @Security('jwt')
    public async updateRecipe(
        @Request() request: ExpressRequest,
        @Path() recipeId: number,
        @Body() requestBody: UpdateRecipeDto
    ): Promise<RecipeResponseDto> {
        const userId = (request as any).user.id;

        const recipe = await this.recipeRepository.findOne({
            where: {id: recipeId},
            relations: ['author', 'tags'],
        });

        if (!recipe) {
            this.setStatus(404);
            throw new Error('Recipe not found');
        }

        if (recipe.author.id !== userId) {
            this.setStatus(403);
            throw new Error('You can only update your own recipes');
        }

        if (requestBody.title !== undefined) {
            recipe.title = requestBody.title;
        }

        if (requestBody.description !== undefined) {
            recipe.description = requestBody.description;
        }

        if (requestBody.ingredients !== undefined) {
            recipe.ingredients = requestBody.ingredients;
        }

        if (requestBody.content !== undefined) {
            recipe.content = requestBody.content;
        }

        if (requestBody.tagIds !== undefined) {
            const tags = await this.tagRepository.findByIds(requestBody.tagIds);
            if (tags.length !== requestBody.tagIds.length) {
                this.setStatus(404);
                throw new Error('One or more tags were not found');
            }
            recipe.tags = tags;
        }

        await this.recipeRepository.save(recipe);

        const updatedRecipe = await this.recipeRepository.findOne({
            where: {id: recipe.id},
            relations: ['author', 'tags', 'likes', 'comments'],
        });

        if (!updatedRecipe) {
            this.setStatus(500);
            throw new Error('Failed to retrieve updated recipe');
        }

        return new RecipeResponseDto(updatedRecipe);
    }

    /**
     * Delete a recipe
     */
    @Delete('{recipeId}')
    @Security('jwt')
    public async deleteRecipe(
        @Request() request: ExpressRequest,
        @Path() recipeId: number
    ): Promise<void> {
        const userId = (request as any).user.id;

        const recipe = await this.recipeRepository.findOne({
            where: {id: recipeId},
            relations: ['author'],
        });

        if (!recipe) {
            this.setStatus(404);
            throw new Error('Recipe not found');
        }

        if (recipe.author.id !== userId) {
            this.setStatus(403);
            throw new Error('You can only delete your own recipes');
        }

        await this.recipeRepository.remove(recipe);
        this.setStatus(204);
    }
}
