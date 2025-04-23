import { Repository } from 'typeorm';
import { Tag } from '../models/Tag';
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

@Route("tags")
@Tags("Tags")
export class TagController extends CrudController<Tag> {
    constructor(
        private readonly tagRepository: Repository<Tag> = AppDataSource.getRepository(Tag),
        exposedFields: (keyof Tag)[] = []
    ) {
        super(tagRepository, exposedFields);
    }

    /**
     * Get all tags
     */
    @Get()
    public async getAll(): Promise<Tag[]> {
        const tags = await this.tagRepository.find({
            relations: ['recipes']
        });
        return this.filterFields(tags);
    }

    /**
     * Get a tag by ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<Tag> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const tag = await this.tagRepository.findOne({
            where: { id },
            relations: ['recipes']
        });

        if (!tag) {
            throw new Error('Tag not found');
        }

        return this.filterFields(tag);
    }

    /**
     * Create a new tag
     */
    @Post()
    @Security("jwt")
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<Tag>): Promise<Tag> {
        // Check if tag with the same name already exists
        if (requestBody.name) {
            const existingTag = await this.tagRepository.findOne({
                where: { name: requestBody.name }
            });

            if (existingTag) {
                throw new Error('Tag with this name already exists');
            }
        }

        const created = this.tagRepository.create(requestBody);
        const saved = await this.tagRepository.save(created);
        return this.filterFields(saved);
    }

    /**
     * Update an existing tag
     */
    @Put("{id}")
    @Security("jwt")
    public async update(@Path() id: number, @Body() requestBody: Partial<Tag>): Promise<Tag> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        // Check if tag with the same name already exists
        if (requestBody.name) {
            const existingTag = await this.tagRepository.findOne({
                where: { name: requestBody.name }
            });

            if (existingTag && existingTag.id !== id) {
                throw new Error('Tag with this name already exists');
            }
        }

        const tag = await this.tagRepository.findOne({
            where: { id },
            relations: ['recipes']
        });

        if (!tag) {
            throw new Error('Tag not found');
        }

        this.tagRepository.merge(tag, requestBody);
        const updated = await this.tagRepository.save(tag);
        return this.filterFields(updated);
    }

    /**
     * Delete a tag
     */
    @Delete("{id}")
    @Security("jwt")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.tagRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Tag not found');
        }
    }

    /**
     * Get a tag by name
     */
    @Get("name/{name}")
    public async getTagByName(@Path() name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({
            where: { name },
            relations: ['recipes']
        });

        if (!tag) {
            throw new Error('Tag not found');
        }

        return this.filterFields(tag);
    }
}