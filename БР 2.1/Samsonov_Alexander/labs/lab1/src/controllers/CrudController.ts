import {ObjectLiteral, Repository} from 'typeorm';
import {
    Route,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Path,
    SuccessResponse,
    Tags
} from "tsoa";

export class CrudController<T extends ObjectLiteral> {
    constructor(
        protected readonly repository: Repository<T>,
        private readonly exposedFields: (keyof T)[] = []
    ) {
    }

    /**
     * Get all items
     * @returns Array of items
     */
    @Get()
    public async getAll(): Promise<T[]> {
        const items = await this.repository.find();
        // @ts-ignore
        return this.filterFields(items);
    }

    /**
     * Get an item by ID
     * @param id The ID of the item to retrieve
     * @returns The item with the specified ID
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<T | { [k: string]: T[keyof T]; } | { [k: string]: T[keyof T]; }[]> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const item = await this.repository.findOneBy({id: id} as any);
        if (!item) {
            throw new Error('Item not found');
        }

        return this.filterFields(item);
    }

    /**
     * Create a new item
     * @param requestBody The item data
     * @returns The created item
     */
    @Post()
    @SuccessResponse("201", "Created")
    public async create(@Body() requestBody: Partial<T>): Promise<T> {
        // @ts-ignore
        const created = this.repository.create(requestBody);
        const saved = await this.repository.save(created);
        // @ts-ignore
        return this.filterFields(saved);
    }

    /**
     * Update an existing item
     * @param id The ID of the item to update
     * @param requestBody The updated item data
     * @returns The updated item
     */
    @Put("{id}")
    public async update(@Path() id: number, @Body() requestBody: Partial<T>): Promise<T> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const item = await this.repository.findOneBy({id: id} as any);
        if (!item) {
            throw new Error('Item not found');
        }

        // @ts-ignore
        this.repository.merge(item, requestBody);
        const updated = await this.repository.save(item);
        // @ts-ignore
        return this.filterFields(updated);
    }

    /**
     * Delete an item
     * @param id The ID of the item to delete
     */
    @Delete("{id}")
    @SuccessResponse("204", "No Content")
    public async remove(@Path() id: number): Promise<void> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new Error('Item not found');
        }
    }

    protected filterFields(data: T | T[]) {
        if (!this.exposedFields.length) return data;

        const filter = (item: T) =>
            Object.fromEntries(
                this.exposedFields.map((key) => [key, item[key]])
            );

        return Array.isArray(data) ? data.map(filter) : filter(data);
    }
}
