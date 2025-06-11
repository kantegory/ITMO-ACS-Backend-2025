import { Request, Response } from "express";
import favoriteService from "../services/favorite.service";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favorite.dto";
import { validateDto } from "../utils/validate.util";

export class FavoriteController {
    async getAllFavorites(req: Request, res: Response) {
        try {
            const favorites = await favoriteService.getAllFavorites(req);
            res.json(favorites);
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async getFavoriteById(req: Request, res: Response) {
        try {
            const favorite = await favoriteService.getFavoriteById(
                req,
                Number(req.params.id)
            );
            res.json(favorite);
        } catch (error: any) {
            const status = error.message === "Favorite not found" ? 404 :
                error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async addFavorite(req: Request, res: Response) {
        const dto = await validateDto(CreateFavoriteDto, req.body, req, res);
        if (!dto) return;

        try {
            const favorite = await favoriteService.addFavorite(req, dto);
            res.status(201).json(favorite);
        } catch (error: any) {
            const status = error.message === "Property not found" ? 404 :
                error.message === "Property already in favorites" ? 400 :
                    error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async updateFavorite(req: Request, res: Response) {
        const dto = await validateDto(UpdateFavoriteDto, req.body, req, res);
        if (!dto) return;

        try {
            const favorite = await favoriteService.updateFavorite(
                req,
                Number(req.params.id),
                dto
            );
            res.json(favorite);
        } catch (error: any) {
            const status = error.message === "Favorite not found" ? 404 :
                error.message === "Property not found" ? 404 :
                    error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async removeFavorite(req: Request, res: Response) {
        try {
            const result = await favoriteService.removeFavorite(
                req,
                Number(req.params.id)
            );
            res.json(result);
        } catch (error: any) {
            const status = error.message === "Favorite not found" ? 404 :
                error.message.includes('Token') ? 401 : 500;
            res.status(status).json({ message: error.message });
        }
    }
}

export default new FavoriteController();