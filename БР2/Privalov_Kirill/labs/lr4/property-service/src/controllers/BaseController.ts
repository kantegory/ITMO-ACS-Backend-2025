import { Request, Response } from 'express';
import { Repository, ObjectLiteral } from 'typeorm';

export class BaseController<T extends ObjectLiteral> {
  constructor(public repository: Repository<T>) { }

  getAll = async (_req: Request, res: Response) => {
    try {
      const items = await this.repository.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      const item = await this.repository.findOneBy({
        [this.repository.metadata.primaryColumns[0].propertyName]: id,
      } as any);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newItem = this.repository.create(req.body);
      const saved = await this.repository.save(newItem);
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: 'Create failed', error: err });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      await this.repository.update(id, req.body);
      const updated = await this.repository.findOneBy({
        [this.repository.metadata.primaryColumns[0].propertyName]: id,
      } as any);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: 'Update failed', error: err });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.repository.delete(+req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Delete failed', error: err });
    }
  };
}
