/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorite properties management
 *
 * components:
 *   schemas:
 *     FavoriteBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     FavoriteWithRelations:
 *       allOf:
 *         - $ref: '#/components/schemas/FavoriteBase'
 *         - type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/UserBase'
 *             property:
 *               $ref: '#/components/schemas/PropertyBase'
 *
 *     FavoriteCreate:
 *       type: object
 *       required:
 *         - userId
 *         - propertyId
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         propertyId:
 *           type: integer
 *           example: 5
 *
 *     FavoriteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Removed from favorites"
 */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";
import { Property } from "../models/Property";

const favoriteRepo = AppDataSource.getRepository(Favorite);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add property to user's favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteCreate'
 *     responses:
 *       201:
 *         description: Property added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteWithRelations'
 *       400:
 *         description: Bad request (already in favorites)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User or Property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of all favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllFavorites = async (_req: Request, res: Response) => {
    try {
        const favorites = await favoriteRepo.find({ relations: ["user", "property"] });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching favorites", error: err });
    }
};

/**
 * @swagger
 * /favorites/user/{userId}:
 *   get:
 *     summary: Get user's favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user's favorite properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /favorites/{userId}/{propertyId}:
 *   delete:
 *     summary: Remove property from user's favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: propertyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteResponse'
 *       404:
 *         description: Favorite not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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