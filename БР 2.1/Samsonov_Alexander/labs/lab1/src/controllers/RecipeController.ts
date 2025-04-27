import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags, Query } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';
import { Tag } from '../models/Tag';
import { CreateRecipeDto, RecipeResponseDto, UpdateRecipeDto } from '../dtos/RecipeDto';

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
      queryBuilder.andWhere('tags.id = :tagId', { tagId });
    }

    if (authorId) {
      queryBuilder.andWhere('author.id = :authorId', { authorId });
    }

    const recipes = await queryBuilder.getMany();
    return recipes.map(recipe => new RecipeResponseDto(recipe));
  }

  /**
   * Get a recipe by ID
   */
  @Get('{recipeId}')
  public async getRecipeById(@Path() recipeId: number): Promise<RecipeResponseDto> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
      relations: ['author', 'tags', 'likes', 'comments']
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
  public async createRecipe(@Body() requestBody: CreateRecipeDto): Promise<RecipeResponseDto> {
    // Get the authenticated user
    const userId = (this.request as any).user.id;
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    // Find tags
    const tags = await Promise.all(
      requestBody.tagIds.map(async (tagId) => {
        const tag = await this.tagRepository.findOne({
          where: { id: tagId }
        });
        if (!tag) {
          this.setStatus(404);
          throw new Error(`Tag with ID ${tagId} not found`);
        }
        return tag;
      })
    );

    // Create recipe
    const recipe = this.recipeRepository.create({
      title: requestBody.title,
      description: requestBody.description,
      ingredients: requestBody.ingredients,
      content: requestBody.content,
      author: user,
      tags: tags
    });

    // Save recipe
    await this.recipeRepository.save(recipe);

    // Return recipe with relations
    const savedRecipe = await this.recipeRepository.findOne({
      where: { id: recipe.id },
      relations: ['author', 'tags', 'likes', 'comments']
    });

    if (!savedRecipe) {
      this.setStatus(500);
      throw new Error('Failed to retrieve saved recipe');
    }

    return new RecipeResponseDto(savedRecipe);
  }

  /**
   * Update a recipe
   */
  @Put('{recipeId}')
  @Security('jwt')
  public async updateRecipe(
    @Path() recipeId: number,
    @Body() requestBody: UpdateRecipeDto
  ): Promise<RecipeResponseDto> {
    // Get the authenticated user
    const userId = (this.request as any).user.id;

    // Find the recipe
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
      relations: ['author', 'tags']
    });

    if (!recipe) {
      this.setStatus(404);
      throw new Error('Recipe not found');
    }

    // Check if the authenticated user is the author of the recipe
    if (recipe.author.id !== userId) {
      this.setStatus(403);
      throw new Error('You can only update your own recipes');
    }

    // Update recipe fields
    if (requestBody.title) {
      recipe.title = requestBody.title;
    }

    if (requestBody.description) {
      recipe.description = requestBody.description;
    }

    if (requestBody.ingredients) {
      recipe.ingredients = requestBody.ingredients;
    }

    if (requestBody.content) {
      recipe.content = requestBody.content;
    }

    // Update tags if provided
    if (requestBody.tagIds) {
      const tags = await Promise.all(
        requestBody.tagIds.map(async (tagId) => {
          const tag = await this.tagRepository.findOne({
            where: { id: tagId }
          });
          if (!tag) {
            this.setStatus(404);
            throw new Error(`Tag with ID ${tagId} not found`);
          }
          return tag;
        })
      );
      recipe.tags = tags;
    }

    // Save updated recipe
    await this.recipeRepository.save(recipe);

    // Return updated recipe with relations
    const updatedRecipe = await this.recipeRepository.findOne({
      where: { id: recipe.id },
      relations: ['author', 'tags', 'likes', 'comments']
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
  public async deleteRecipe(@Path() recipeId: number): Promise<void> {
    // Get the authenticated user
    const userId = (this.request as any).user.id;

    // Find the recipe
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
      relations: ['author']
    });

    if (!recipe) {
      this.setStatus(404);
      throw new Error('Recipe not found');
    }

    // Check if the authenticated user is the author of the recipe
    if (recipe.author.id !== userId) {
      this.setStatus(403);
      throw new Error('You can only delete your own recipes');
    }

    // Delete the recipe
    await this.recipeRepository.remove(recipe);

    this.setStatus(204);
  }
}