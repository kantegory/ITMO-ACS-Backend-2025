import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";
import { Property } from "../models/Property";

const favoriteRepo = AppDataSource.getRepository(Favorite);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

export const addFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, propertyId } = req.body;

        const user = await userRepo.findOneBy({ id: userId });
        const property = await propertyRepo.findOneBy({ id: propertyId });

        if (!user || !property) {
            return res.status(404).json({ message: "User or Property not found" });
        }

        const existingFavorite = await favoriteRepo.findOne({
            where: { user: { id: userId }, property: { id: propertyId } },
        });

        if (existingFavorite) {
            return res.status(400).json({ message: "Already in favorites" });
        }

        const favorite = favoriteRepo.create({ user, property });
        await favoriteRepo.save(favorite);

        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ message: "Error adding favorite", error: err });
    }
};

export const getAllFavorites = async (_req: Request, res: Response) => {
    try {
        const favorites = await favoriteRepo.find({ relations: ["user", "property"] });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching favorites", error: err });
    }
};

export const getFavoritesByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const favorites = await favoriteRepo.find({
            where: { user: { id: parseInt(userId) } },
            relations: ["property"],
        });

        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user's favorites", error: err });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, propertyId } = req.params;

        const favorite = await favoriteRepo.findOne({
            where: {
                user: { id: parseInt(userId) },
                property: { id: parseInt(propertyId) },
            },
        });

        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        await favoriteRepo.remove(favorite);
        res.json({ message: "Removed from favorites" });
    } catch (err) {
        res.status(500).json({ message: "Error removing favorite", error: err });
    }
};