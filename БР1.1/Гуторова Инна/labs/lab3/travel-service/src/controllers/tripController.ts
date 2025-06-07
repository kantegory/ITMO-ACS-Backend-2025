import { Request, Response } from 'express';
import { TripService } from '../services/tripService';

export class TripController {
    static async create(req: Request, res: Response) {
        try {
            const trip = await TripService.create(req.body);
            res.status(201).json(trip);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create trip';
            res.status(400).json({ message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const trips = await TripService.findAll();
            res.json(trips);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get trips';
            res.status(500).json({ message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const trip = await TripService.findById(Number(req.params.id));
            trip 
                ? res.json(trip)
                : res.status(404).json({ message: 'Trip not found' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get trip';
            res.status(500).json({ message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const trip = await TripService.update(
                Number(req.params.id),
                req.body
            );
            res.json(trip);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update trip';
            res.status(400).json({ message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await TripService.delete(Number(req.params.id));
            res.json({ message: 'Trip deleted successfully' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete trip';
            res.status(400).json({ message });
        }
    }
}