import { Request, Response } from 'express';
import { MediaService } from '../services/mediaService';

export class MediaController {
    static async create(req: Request, res: Response) {
        try {
            const media = await MediaService.create(req.body);
            res.status(201).json(media);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to create media';
            res.status(400).json({ message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const media = await MediaService.findAll();
            res.json(media);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get media';
            res.status(500).json({ message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const media = await MediaService.findById(Number(req.params.id));
            media 
                ? res.json(media)
                : res.status(404).json({ message: 'Media not found' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get media';
            res.status(500).json({ message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await MediaService.delete(Number(req.params.id));
            res.json({ message: 'Media deleted successfully' });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete media';
            res.status(400).json({ message });
        }
    }
}