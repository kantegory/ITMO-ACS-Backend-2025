import { Request, Response } from 'express';
import { AttractionService } from '../services/attractionService';

export class AttractionController {
    static async create(req: Request, res: Response) {
        try {
            const attraction = await AttractionService.create(req.body);
            res.status(201).json(attraction);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create attraction';
            res.status(400).json({ message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const attractions = await AttractionService.findAll();
            res.json(attractions);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get attractions';
            res.status(500).json({ message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const attraction = await AttractionService.findById(Number(req.params.id));
            if (!attraction) {
                return res.status(404).json({ message: 'Attraction not found' });
            }
            res.json(attraction);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get attraction';
            res.status(500).json({ message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const attraction = await AttractionService.update(
                Number(req.params.id),
                req.body
            );
            res.json(attraction);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update attraction';
            res.status(400).json({ message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await AttractionService.delete(Number(req.params.id));
            res.json({ message: 'Attraction deleted successfully' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete attraction';
            res.status(400).json({ message });
        }
    }
}