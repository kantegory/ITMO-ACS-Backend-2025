import { Repository } from 'typeorm';
import { Recipe } from '../models/Recipe';
import { CrudController } from './CrudController';
import { 
    Route, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Path, 
    Query, 
    SuccessResponse, 
    Tags,
    Security
} from "tsoa";
import { AppDataSource } from "../data-source";
import { User } from '../models/User';
import { Tag } from '../models/Tag';

@Route("recipes")
@Tags("Recipes")
export class RecipeController extends CrudController<Recipe> {
    constructor(
        private readonly recipeRepository: Repository<Recipe> = AppDataSource.getRepository(Recipe),
        exposedFields: (keyof Recipe)[] = []
    ) {
        super(recipeRepository, exposedFields);
    }

    /**
     * Get all recipes
     */
    @Get()
    public async getAll(): Promise<Recipe[]> {
        const recipes = await this.recipeRepository.find({
            relations: ['author', 'tags']
        });
        return this.filterFields(recipes);
    }

    /**
     * Get a recipe by ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<Recipe> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const recipe = await this.recipeRepository.findOne({
            where: { id },
            relations: ['author', 'tags']
        });

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return this.filterFields(recipe);
    }

    /**
     * Create a new recipe
     */
    @Post()
    @Security("jwt")
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<Recipe>): Promise<Recipe> {
        const created = this.recipeRepository.create(requestBody);
        const saved = await this.recipeRepository.save(created);
        return this.filterFields(saved);
    }

    /**
     * Update an existing recipe
     */
    @Put("{id}")
    @Security("jwt")
    public async update(@Path() id: number, @Body() requestBody: Partial<Recipe>): Promise<Recipe> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const recipe = await this.recipeRepository.findOne({
            where: { id },
            relations: ['author', 'tags']
        });

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        this.recipeRepository.merge(recipe, requestBody);
        const updated = await this.recipeRepository.save(recipe);
        return this.filterFields(updated);
    }

    /**
     * Delete a recipe
     */
    @Delete("{id}")
    @Security("jwt")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.recipeRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Recipe not found');
        }
    }

    /**
     * Get recipes by author ID
     */
    @Get("author/{authorId}")
    public async getRecipesByAuthor(@Path() authorId: number): Promise<Recipe[]> {
        if (isNaN(authorId)) {
            throw new Error('Invalid author ID format');
        }

        const recipes = await this.recipeRepository.find({
            where: { author: { id: authorId } },
            relations: ['author', 'tags']
        });

        return this.filterFields(recipes);
    }

    /**
     * Get recipes by tag name
     */
    @Get("tag/{tagName}")
    public async getRecipesByTag(@Path() tagName: string): Promise<Recipe[]> {
        const recipes = await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.author', 'author')
            .leftJoinAndSelect('recipe.tags', 'tag')
            .where('tag.name = :tagName', { tagName })
            .getMany();

        return this.filterFields(recipes);
    }
}