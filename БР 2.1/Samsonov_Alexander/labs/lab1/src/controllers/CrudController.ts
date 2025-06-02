import { Request, Response } from 'express';
import {ObjectLiteral, Repository} from 'typeorm';

export class CrudController<T extends ObjectLiteral> {
    constructor(
        private readonly repository: Repository<T>,
        private readonly exposedFields: (keyof T)[] = []
    ) {}

    getAll = async (_req: Request, res: Response) => {
        const items = await this.repository.find();
        res.json(this.filterFields(items));
    };

    getOne = async (req: Request, res: Response) => {
        const item = await this.repository.findOneBy({ id: +req.params.id } as any);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(this.filterFields(item));
    };

    create = async (req: Request, res: Response) => {
        const created = this.repository.create(req.body);
        const saved = await this.repository.save(created);
        res.status(201).json(this.filterFields(saved));
    };

    update = async (req: Request, res: Response) => {
        const item = await this.repository.findOneBy({ id: +req.params.id } as any);
        if (!item) return res.status(404).json({ message: 'Not found' });

        this.repository.merge(item, req.body);
        const updated = await this.repository.save(item);
        res.json(this.filterFields(updated));
    };

    delete = async (req: Request, res: Response) => {
        const result = await this.repository.delete(req.params.id);
        if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
        res.status(204).send();
    };

    private filterFields(data: T | T[]) {
        if (!this.exposedFields.length) return data;

        const filter = (item: T) =>
            Object.fromEntries(
                this.exposedFields.map((key) => [key, item[key]])
            );

        return Array.isArray(data) ? data.map(filter) : filter(data);
    }
}
