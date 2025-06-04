import { BaseModel } from '../../../application/domain/base.model';

export abstract class BaseFakeRepository<T> {
    protected items: T[] = [];
    private nextId = 1;

    async findAll(): Promise<T[]> {
        return [...this.items];
    }

    async findById(id: number): Promise<T | null> {
        return this.items.find(item => (item as any).id === id) || null;
    }

    async save(item: T): Promise<T> {
        const itemWithId = item as any;
        if (!itemWithId.id) {
            itemWithId.id = this.nextId++;
            this.items.push(item);
        } else {
            const index = this.items.findIndex(i => (i as any).id === itemWithId.id);
            if (index !== -1) {
                this.items[index] = item;
            } else {
                this.items.push(item);
            }
        }
        return item;
    }

    async delete(id: number): Promise<void> {
        const index = this.items.findIndex(item => (item as any).id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    protected clear(): void {
        this.items = [];
        this.nextId = 1;
    }
} 