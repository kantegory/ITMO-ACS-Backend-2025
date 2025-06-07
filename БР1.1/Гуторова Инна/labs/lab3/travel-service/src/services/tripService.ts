import { AppDataSource } from "../config/database";
import Trip from "../entities/Trip";
import Route from "../entities/Route";
import { FindOptionsWhere } from "typeorm";

export class TripService {
    private static repo = AppDataSource.getRepository(Trip);

    static async create(data: {
        start_date: Date;
        end_date: Date;
        available_slots: number;
        status: string;
        route_id: number;
    }): Promise<Trip> {
        const route = await AppDataSource.getRepository(Route).findOneBy({ 
            route_id: data.route_id 
        });
        if (!route) throw new Error("Route not found");

        const trip = new Trip();
        trip.start_date = data.start_date;
        trip.end_date = data.end_date;
        trip.available_slots = data.available_slots;
        trip.status = data.status;
        trip.route = route;

        return await this.repo.save(trip);
    }

    static async findAll(): Promise<Trip[]> {
        return await this.repo.find({ relations: ['route'] });
    }

    static async findById(id: number): Promise<Trip | null> {
        return await this.repo.findOne({ 
            where: { trip_id: id } as FindOptionsWhere<Trip>,
            relations: ['route']
        });
    }

    static async update(
        id: number, 
        data: Partial<Omit<Trip, 'trip_id' | 'route'>> & { route_id?: number }
    ): Promise<Trip> {
        const trip = await this.findById(id);
        if (!trip) throw new Error("Trip not found");

        if (data.route_id) {
            const route = await AppDataSource.getRepository(Route).findOneBy({ 
                route_id: data.route_id 
            });
            if (!route) throw new Error("Route not found");
            trip.route = route;
        }

        Object.assign(trip, data);
        return await this.repo.save(trip);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete({ 
            trip_id: id 
        } as FindOptionsWhere<Trip>);
        if (result.affected === 0) throw new Error("Trip not found");
    }
}