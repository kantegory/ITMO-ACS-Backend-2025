import { AppDataSource } from "../data-source";
import { Favorite } from "../models/favorite";
import { Property } from "../models/property";
import { User } from "../models/user";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favoriteDto";

const favoriteRepository = AppDataSource.getRepository(Favorite);
const propertyRepository = AppDataSource.getRepository(Property);
const userRepository = AppDataSource.getRepository(User);

class FavoriteService {
    async getAllFavorites(userId: number) {
        return favoriteRepository.find({
            where: { user: { id: userId } },
            relations: ['property', 'property.owner'],
            order: { created_at: 'DESC' }
        });
    }

    async getFavoriteById(favoriteId: number, userId?: number) {
        if (!userId) {
            throw new Error("User not found");
        }

        const favorite = await favoriteRepository.findOne({
            where: { id: favoriteId, user: { id: userId } },
            relations: ['property', 'property.owner']
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }
        return favorite;
    }

    async addFavorite(userId: number, dto: CreateFavoriteDto) {
        const property = await propertyRepository.findOneBy({ id: dto.propertyId });
        if (!property) {
            throw new Error("Property not found");
        }

        const existingFavorite = await favoriteRepository.findOne({
            where: {
                user: { id: userId },
                property: { id: dto.propertyId }
            }
        });

        if (existingFavorite) {
            throw new Error("Property already in favorites");
        }

        const favorite = favoriteRepository.create({
            user: { id: userId },
            property: { id: dto.propertyId }
        });

        await favoriteRepository.save(favorite);
        return this.getFavoriteById(favorite.id, userId);
    }

    async updateFavorite(userId: number, favoriteId: number, dto: UpdateFavoriteDto) {
        const favorite = await this.getFavoriteById(favoriteId, userId);

        if (dto.propertyId) {
            const property = await propertyRepository.findOneBy({ id: dto.propertyId });
            if (!property) {
                throw new Error("Property not found");
            }
            favorite.property = property;
        }

        await favoriteRepository.save(favorite);
        return this.getFavoriteById(favoriteId, userId);
    }

    async removeFavorite(userId: number, favoriteId: number) {
        const favorite = await this.getFavoriteById(favoriteId, userId);
        await favoriteRepository.remove(favorite);
        return { message: "Favorite removed successfully" };
    }

    async getUserFavorites(userId: number) {
        const userExists = await userRepository.exist({
            where: { id: userId }
        });

        if (!userExists) {
            throw new Error("User not found");
        }

        return favoriteRepository.find({
            where: { user: { id: userId } },
            relations: {
                property: {
                    owner: true
                }
            },
            order: { created_at: "DESC" },
            select: {
                id: true,
                created_at: true,
                property: {
                    id: true,
                    title: true,
                    owner: {
                        id: true,
                        email: true
                    }
                }
            }
        });
    }
}

export default new FavoriteService();