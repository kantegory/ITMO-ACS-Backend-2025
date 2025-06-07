import { Request, Response } from 'express';
import { RouteService } from '../services/routeService';

export class RouteController {
    static async create(req: Request, res: Response) {
        try {
            const route = await RouteService.create(req.body);
            res.status(201).json(route);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create route';
            res.status(400).json({ message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const routes = await RouteService.findAll();
            res.json(routes);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get routes';
            res.status(500).json({ message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const route = await RouteService.findById(Number(req.params.id));
            route 
                ? res.json(route)
                : res.status(404).json({ message: 'Route not found' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get route';
            res.status(500).json({ message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const route = await RouteService.update(
                Number(req.params.id),
                req.body
            );
            res.json(route);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update route';
            res.status(400).json({ message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await RouteService.delete(Number(req.params.id));
            res.json({ message: 'Route deleted successfully' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete route';
            res.status(400).json({ message });
        }
    }
}