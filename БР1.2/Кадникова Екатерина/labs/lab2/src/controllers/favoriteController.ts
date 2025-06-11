import { Request, Response } from "express";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favoriteDto";
import { validateDto } from "../utils/validateDto";
import favoriteService from "../services/favoriteService";

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const favorites = await favoriteService.getAllFavorites(userId);
        res.json(favorites);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error fetching favorites" });
    }
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await favoriteService.getFavoriteById(
            Number(req.params.id),
            req.user?.id
        );
        res.json(favorite);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Favorite not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const addFavorite = async (req: Request, res: Response) => {
    const dto = await validateDto(CreateFavoriteDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const newFavorite = await favoriteService.addFavorite(userId, dto);
        res.status(201).json(newFavorite);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Property not found" ? 404 :
            error.message === "Property already in favorites" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const updateFavorite = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdateFavoriteDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const updatedFavorite = await favoriteService.updateFavorite(
            userId,
            Number(req.params.id),
            dto
        );
        res.json(updatedFavorite);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Favorite not found" ? 404 :
            error.message === "Property not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    console.log('This is a test console log');
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const result = await favoriteService.removeFavorite(
            userId,
            Number(req.params.id)
        );
        res.json(result);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Favorite not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const getUserFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const favorites = await favoriteService.getUserFavorites(userId);
        res.json(favorites);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error fetching favorites" });
    }
};