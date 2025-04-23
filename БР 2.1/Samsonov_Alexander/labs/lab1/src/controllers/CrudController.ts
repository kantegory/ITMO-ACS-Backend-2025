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
        // Process relationships to ensure only IDs are used
        const processedBody = this.processRelationships(requestBody);

        // @ts-ignore
        const created = this.repository.create(processedBody);
        const saved = await this.repository.save(created);
        // @ts-ignore
        return this.filterFields(saved);
    }

    /**
     * Process relationships in the request body to ensure only IDs are used
     * @param requestBody The request body to process
     * @returns The processed request body
     */
    protected processRelationships(requestBody: Partial<T>): Partial<T> {
        const processed = { ...requestBody };

        // Process each property in the request body
        for (const key in processed) {
            const value = processed[key as keyof Partial<T>];

            // If the value is an object with an ID, replace it with an object containing only the ID
            if (value && typeof value === 'object' && 'id' in value) {
                // @ts-ignore
                processed[key] = { id: value.id };
            }

            // If the value is an array of objects with IDs, replace each with an object containing only the ID
            if (Array.isArray(value)) {
                // @ts-ignore
                processed[key] = value.map(item => {
                    if (item && typeof item === 'object' && 'id' in item) {
                        return { id: item.id };
                    }
                    return item;
                });
            }
        }

        return processed;
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

        // Remove relationship fields from the request body to prevent modifying sub-models
        const filteredBody = this.removeRelationshipFields(requestBody);

        // @ts-ignore
        this.repository.merge(item, filteredBody);
        const updated = await this.repository.save(item);
        // @ts-ignore
        return this.filterFields(updated);
    }

    /**
     * Remove relationship fields from the request body to prevent modifying sub-models
     * @param requestBody The request body to filter
     * @returns The filtered request body without relationship fields
     */
    protected removeRelationshipFields(requestBody: Partial<T>): Partial<T> {
        const filtered = { ...requestBody };

        // Process each property in the request body
        for (const key in filtered) {
            const value = filtered[key as keyof Partial<T>];

            // Remove objects that represent relationships
            if (value && typeof value === 'object' && 'id' in value) {
                delete filtered[key as keyof Partial<T>];
            }

            // Remove arrays that might represent relationships
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
                delete filtered[key as keyof Partial<T>];
            }
        }

        return filtered;
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
