import { AppDataSource } from "../config/database";
import Route from "../entities/Route";
import TravelType from "../entities/TravelType";
import { FindOptionsWhere } from "typeorm";

export class RouteService {
    private static repo = AppDataSource.getRepository(Route);

    static async create(data: {
        title: string;
        description: string;
        price: number;
        duration: string;
        travel_type_id: number;
    }): Promise<Route> {
        const travelType = await AppDataSource.getRepository(TravelType).findOneBy({ 
            travel_type_id: data.travel_type_id 
        });
        if (!travelType) throw new Error("Travel type not found");

        const route = new Route();
        route.title = data.title;
        route.description = data.description;
        route.price = data.price;
        route.duration = data.duration;
        route.travel_type = travelType;

        return await this.repo.save(route);
    }

    static async findAll(): Promise<Route[]> {
        return await this.repo.find({ 
            relations: ['travel_type', 'attractions', 'trips'] 
        });
    }

    static async findById(id: number): Promise<Route | null> {
        return await this.repo.findOne({ 
            where: { route_id: id } as FindOptionsWhere<Route>,
            relations: ['travel_type', 'attractions', 'trips', 'media']
        });
    }

    static async update(id: number, data: Partial<Route> & { travel_type_id?: number }): Promise<Route> {
        const route = await this.findById(id);
        if (!route) throw new Error("Route not found");

        if (data.travel_type_id) {
            const travelType = await AppDataSource.getRepository(TravelType).findOneBy({ 
                travel_type_id: data.travel_type_id 
            });
            if (!travelType) throw new Error("Travel type not found");
            route.travel_type = travelType;
            delete data.travel_type_id;
        }

        Object.assign(route, data);
        return await this.repo.save(route);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete({ 
            route_id: id 
        } as FindOptionsWhere<Route>);
        if (result.affected === 0) throw new Error("Route not found");
    }
}