import { Request, Response } from 'express';
import { FavoriteService } from '../services/favoriteService';

export class FavoriteController {
    static async create(req: Request, res: Response) {
        try {
            const favorite = await FavoriteService.create(
                {
                    user_id: req.user!.id,
                    route_id: req.body.route_id
                }
            );
            res.status(201).json(favorite);
        } catch (error: any) {
            res.status(400).json({ 
                message: error.message,
                code: 'FAVORITE_CREATE_FAILED'
            });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const favorites = await FavoriteService.getAll();
            res.json(favorites);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                code: 'FAVORITES_FETCH_FAILED'
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const favorite = await FavoriteService.getById(Number(req.params.id));
            favorite 
                ? res.json(favorite)
                : res.status(404).json({ message: 'Favorite not found' });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                code: 'FAVORITE_FETCH_FAILED'
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const favorite = await FavoriteService.update(
                Number(req.params.id),
                req.body
            );
            res.json(favorite);
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
                code: 'FAVORITE_UPDATE_FAILED'
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await FavoriteService.delete(Number(req.params.id));
            res.json({ message: 'Favorite deleted successfully' });
        } catch (error: any) {
            res.status(400).json({
                message: error.message,
                code: 'FAVORITE_DELETE_FAILED'
            });
        }
    }

    }

  
