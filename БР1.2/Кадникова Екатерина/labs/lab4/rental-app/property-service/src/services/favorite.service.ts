import { AppDataSource } from "../config/database";
import { Favorite } from "../models/favorite.entity";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favorite.dto";
import propertyService from "./property.service";
import userClient from "./user.client";
import { Request } from 'express';
import authClient from "./auth.client";

export class FavoriteService {
    private favoriteRepository = AppDataSource.getRepository(Favorite);

    async getAllFavorites(req: Request) {
        const user = await authClient.verifyToken(req);
        const favorites = await this.favoriteRepository.find({ where: { userId: user.id } });
        return this.enrichFavorites(favorites, req);
    }

    async getFavoriteById(req: Request, favoriteId: number) {
        const user = await authClient.verifyToken(req);
        const favorite = await this.favoriteRepository.findOne({
            where: { id: favoriteId, userId: user.id }
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }

        return this.enrichFavorite(favorite, req);
    }

    async addFavorite(req: Request, dto: CreateFavoriteDto) {
        const user = await authClient.verifyToken(req);

        // Verify property exists
        await propertyService.getPropertyById(dto.propertyId);

        const existingFavorite = await this.favoriteRepository.findOne({
            where: { userId: user.id, propertyId: dto.propertyId }
        });

        if (existingFavorite) {
            throw new Error("Property already in favorites");
        }

        const favorite = this.favoriteRepository.create({
            userId: user.id,
            propertyId: dto.propertyId
        });

        await this.favoriteRepository.save(favorite);
        return this.enrichFavorite(favorite, req);
    }

    async updateFavorite(req: Request, favoriteId: number, dto: UpdateFavoriteDto) {
        const user = await authClient.verifyToken(req);

        const favorite = await this.favoriteRepository.findOne({
            where: { id: favoriteId, userId: user.id }
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }

        // Verify new property exists
        await propertyService.getPropertyById(dto.propertyId);

        favorite.propertyId = dto.propertyId;
        await this.favoriteRepository.save(favorite);
        return this.enrichFavorite(favorite, req);
    }

    async removeFavorite(req: Request, favoriteId: number) {
        const user = await authClient.verifyToken(req);

        const favorite = await this.favoriteRepository.findOne({
            where: { id: favoriteId, userId: user.id }
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }

        await this.favoriteRepository.remove(favorite);
        return { message: "Favorite removed successfully" };
    }

    private async enrichFavorite(favorite: Favorite, req: Request) {
        const property = await propertyService.getPropertyById(favorite.propertyId);

        if (!req.headers.authorization) {
            throw new Error('Authorization header is missing');
        }

        const user = await userClient.getUserById(favorite.userId, req.headers.authorization);
        return { ...favorite, property, user };
    }

    private async enrichFavorites(favorites: Favorite[], req: Request) {
        return Promise.all(favorites.map(f => this.enrichFavorite(f, req)));
    }
}

export default new FavoriteService();