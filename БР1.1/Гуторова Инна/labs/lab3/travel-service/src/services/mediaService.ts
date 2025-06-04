import { AppDataSource } from "../config/database";
import Media from "../entities/Media";
import Route from "../entities/Route";
import Attraction from "../entities/Attraction";
import { FindOptionsWhere } from "typeorm";

export class MediaService {
    private static repo = AppDataSource.getRepository(Media);

    static async create(data: {
        url: string;
        type: string;
        route_id?: number;
        attraction_id?: number;
    }): Promise<Media> {
        const media = new Media();
        media.url = data.url;
        media.type = data.type;

        if (data.route_id) {
            const route = await AppDataSource.getRepository(Route).findOneBy({
                route_id: data.route_id
            });
            if (!route) throw new Error("Route not found");
            media.route = route;
        }

        if (data.attraction_id) {
            const attraction = await AppDataSource.getRepository(Attraction).findOneBy({
                attraction_id: data.attraction_id
            });
            if (!attraction) throw new Error("Attraction not found");
            media.attraction = attraction;
        }

        return await this.repo.save(media);
    }

    static async findAll(): Promise<Media[]> {
        return await this.repo.find({ relations: ['route', 'attraction'] });
    }

    static async findById(id: number): Promise<Media | null> {
        return await this.repo.findOne({
            where: { media_id: id } as FindOptionsWhere<Media>,
            relations: ['route', 'attraction']
        });
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete({
            media_id: id
        } as FindOptionsWhere<Media>);
        if (result.affected === 0) throw new Error("Media not found");
    }
}