import { Request, Response } from 'express';
import { TravelTypeService } from '../services/travelTypeService';

export class TravelTypeController {
    static async create(req: Request, res: Response) {
        try {
            const travelType = await TravelTypeService.create(req.body);
            res.status(201).json(travelType);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create travel type';
            res.status(400).json({ message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const travelTypes = await TravelTypeService.findAll();
            res.json(travelTypes);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get travel types';
            res.status(500).json({ message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const travelType = await TravelTypeService.findById(Number(req.params.id));
            travelType 
                ? res.json(travelType)
                : res.status(404).json({ message: 'Travel type not found' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get travel type';
            res.status(500).json({ message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const travelType = await TravelTypeService.update(
                Number(req.params.id),
                req.body
            );
            res.json(travelType);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update travel type';
            res.status(400).json({ message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await TravelTypeService.delete(Number(req.params.id));
            res.json({ message: 'Travel type deleted successfully' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete travel type';
            res.status(400).json({ message });
        }
    }
}