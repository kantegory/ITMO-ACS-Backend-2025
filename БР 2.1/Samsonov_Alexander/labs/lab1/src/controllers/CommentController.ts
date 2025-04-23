import { Repository } from 'typeorm';
import { Comment } from '../models/Comment';
import { CrudController } from './CrudController';
import { 
    Route, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Path, 
    SuccessResponse, 
    Tags,
    Security
} from "tsoa";
import { AppDataSource } from "../data-source";

@Route("comments")
@Tags("Comments")
export class CommentController extends CrudController<Comment> {
    constructor(
        private readonly commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment),
        exposedFields: (keyof Comment)[] = []
    ) {
        super(commentRepository, exposedFields);
    }

    /**
     * Get all comments
     */
    @Get()
    public async getAll(): Promise<Comment[]> {
        const comments = await this.commentRepository.find({
            relations: ['user', 'recipe']
        });
        return this.filterFields(comments);
    }

    /**
     * Get a comment by ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<Comment> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'recipe']
        });

        if (!comment) {
            throw new Error('Comment not found');
        }

        return this.filterFields(comment);
    }

    /**
     * Create a new comment
     */
    @Post()
    @Security("jwt")
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<Comment>): Promise<Comment> {
        const created = this.commentRepository.create(requestBody);
        const saved = await this.commentRepository.save(created);
        return this.filterFields(saved);
    }

    /**
     * Update an existing comment
     */
    @Put("{id}")
    @Security("jwt")
    public async update(@Path() id: number, @Body() requestBody: Partial<Comment>): Promise<Comment> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'recipe']
        });

        if (!comment) {
            throw new Error('Comment not found');
        }

        this.commentRepository.merge(comment, requestBody);
        const updated = await this.commentRepository.save(comment);
        return this.filterFields(updated);
    }

    /**
     * Delete a comment
     */
    @Delete("{id}")
    @Security("jwt")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.commentRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Comment not found');
        }
    }

    /**
     * Get comments by recipe ID
     */
    @Get("recipe/{recipeId}")
    public async getCommentsByRecipe(@Path() recipeId: number): Promise<Comment[]> {
        if (isNaN(recipeId)) {
            throw new Error('Invalid recipe ID format');
        }

        const comments = await this.commentRepository.find({
            where: { recipe: { id: recipeId } },
            relations: ['user', 'recipe']
        });

        return this.filterFields(comments);
    }

    /**
     * Get comments by user ID
     */
    @Get("user/{userId}")
    public async getCommentsByUser(@Path() userId: number): Promise<Comment[]> {
        if (isNaN(userId)) {
            throw new Error('Invalid user ID format');
        }

        const comments = await this.commentRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'recipe']
        });

        return this.filterFields(comments);
    }
}