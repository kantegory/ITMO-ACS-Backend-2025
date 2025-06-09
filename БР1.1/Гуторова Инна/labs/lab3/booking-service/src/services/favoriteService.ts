import { AppDataSource } from '../config/database';
import { Favorite } from '../entities/Favorite';
import { userClient } from './userClient';
import { travelClient } from './travelClient';

export class FavoriteService {
    private static repo = AppDataSource.getRepository(Favorite);

    static async create(data: {
        user_id: number;
        route_id: number;
    }): Promise<Favorite> {
        await Promise.all([
            userClient.getUserById(data.user_id),
            travelClient.getRouteById(data.route_id)
        ]);

        const exists = await this.repo.findOneBy({
            user_id: data.user_id,
            route_id: data.route_id
        });
        if (exists) throw new Error('Route already in favorites');

        const favorite = this.repo.create(data);
        return await this.repo.save(favorite);
    }

    static async getAll(): Promise<Favorite[]> {
        return await this.repo.find();
    }

    static async getById(id: number): Promise<Favorite | null> {
        return await this.repo.findOneBy({ favorite_id: id });
    }


    static async update(
        id: number,
        updates: Partial<Pick<Favorite, 'route_id'>>
    ): Promise<Favorite> {
        const favorite = await this.getById(id);
        if (!favorite) throw new Error('Favorite not found');

        if (updates.route_id) {
            await travelClient.getRouteById(updates.route_id);
            favorite.route_id = updates.route_id;
        }

        return await this.repo.save(favorite);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) throw new Error('Favorite not found');
    }
}