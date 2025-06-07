import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../config/database';
import Attraction from '../entities/Attraction';
import Route from '../entities/Route';

export class AttractionService {
    private static attractionRepository = AppDataSource.getRepository(Attraction);

    static async create(attractionData: {
        name: string;
        description: string;
        location: string;
        routeId: number;
    }): Promise<Attraction> {
        const route = await AppDataSource.getRepository(Route).findOneBy({ 
            route_id: attractionData.routeId 
        });
        
        if (!route) {
            throw new Error("Route not found");
        }

        const attraction = new Attraction();
        attraction.name = attractionData.name;
        attraction.description = attractionData.description;
        attraction.location = attractionData.location;
        attraction.route = route;

        return await this.attractionRepository.save(attraction);
    }

    static async findAll(): Promise<Attraction[]> {
        return await this.attractionRepository.find({ 
            relations: ['route', 'media'] 
        });
    }

    static async findById(id: number): Promise<Attraction | null> {
        return await this.attractionRepository.findOne({ 
            where: { attraction_id: id } as FindOptionsWhere<Attraction>,
            relations: ['route', 'media']
        });
    }

    static async update(
        id: number, 
        updateData: Partial<Omit<Attraction, 'attraction_id' | 'route'>> & { routeId?: number }
    ): Promise<Attraction> {
        const attraction = await this.findById(id);
        if (!attraction) {
            throw new Error("Attraction not found");
        }

        if (updateData.routeId) {
            const route = await AppDataSource.getRepository(Route).findOneBy({ 
                route_id: updateData.routeId 
            });
            if (!route) {
                throw new Error("Route not found");
            }
            attraction.route = route;
            delete updateData.routeId;
        }

        Object.assign(attraction, updateData);
        return await this.attractionRepository.save(attraction);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.attractionRepository.delete({ 
            attraction_id: id 
        } as FindOptionsWhere<Attraction>);
        
        if (result.affected === 0) {
            throw new Error("Attraction not found");
        }
    }
}