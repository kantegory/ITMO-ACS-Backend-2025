import { Repository } from 'typeorm';
import { Like } from '../models/Like';
import { CrudController } from './CrudController';
import { 
    Route, 
    Get, 
    Post, 
    Delete, 
    Body, 
    Path, 
    SuccessResponse, 
    Tags,
    Security
} from "tsoa";
import { AppDataSource } from "../data-source";

@Route("likes")
@Tags("Likes")
export class LikeController extends CrudController<Like> {
    constructor(
        private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like),
        exposedFields: (keyof Like)[] = []
    ) {
        super(likeRepository, exposedFields);
    }

    /**
     * Get all likes
     */
    @Get()
    public async getAll(): Promise<Like[]> {
        const likes = await this.likeRepository.find({
            relations: ['user', 'recipe']
        });
        return this.filterFields(likes);
    }

    /**
     * Get a like by ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<Like> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const like = await this.likeRepository.findOne({
            where: { id },
            relations: ['user', 'recipe']
        });

        if (!like) {
            throw new Error('Like not found');
        }

        return this.filterFields(like);
    }

    /**
     * Create a new like
     */
    @Post()
    @Security("jwt")
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<Like>): Promise<Like> {
        // Check if like already exists
        const existingLike = await this.likeRepository.findOne({
            where: {
                user: { id: (requestBody.user as any).id },
                recipe: { id: (requestBody.recipe as any).id }
            }
        });

        if (existingLike) {
            throw new Error('User has already liked this recipe');
        }

        const created = this.likeRepository.create(requestBody);
        const saved = await this.likeRepository.save(created);
        return this.filterFields(saved);
    }

    /**
     * Delete a like
     */
    @Delete("{id}")
    @Security("jwt")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.likeRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Like not found');
        }
    }

    /**
     * Get likes by recipe ID
     */
    @Get("recipe/{recipeId}")
    public async getLikesByRecipe(@Path() recipeId: number): Promise<Like[]> {
        if (isNaN(recipeId)) {
            throw new Error('Invalid recipe ID format');
        }

        const likes = await this.likeRepository.find({
            where: { recipe: { id: recipeId } },
            relations: ['user', 'recipe']
        });

        return this.filterFields(likes);
    }

    /**
     * Get likes by user ID
     */
    @Get("user/{userId}")
    public async getLikesByUser(@Path() userId: number): Promise<Like[]> {
        if (isNaN(userId)) {
            throw new Error('Invalid user ID format');
        }

        const likes = await this.likeRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'recipe']
        });

        return this.filterFields(likes);
    }

    /**
     * Check if a user has liked a recipe
     */
    @Get("check/{userId}/{recipeId}")
    public async checkLike(@Path() userId: number, @Path() recipeId: number): Promise<boolean> {
        if (isNaN(userId) || isNaN(recipeId)) {
            throw new Error('Invalid ID format');
        }

        const like = await this.likeRepository.findOne({
            where: {
                user: { id: userId },
                recipe: { id: recipeId }
            }
        });

        return !!like;
    }
}