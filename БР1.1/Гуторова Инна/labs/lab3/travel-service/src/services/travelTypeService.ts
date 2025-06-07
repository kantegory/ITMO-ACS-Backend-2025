import { AppDataSource } from "../config/database";
import TravelType from "../entities/TravelType";
import { FindOptionsWhere } from "typeorm";

export class TravelTypeService {
    private static repo = AppDataSource.getRepository(TravelType);

    static async create(data: {
        name: string;
        description?: string;
    }): Promise<TravelType> {
        const travelType = new TravelType();
        travelType.name = data.name;

        return await this.repo.save(travelType);
    }

    static async findAll(): Promise<TravelType[]> {
        return await this.repo.find({ relations: ['routes'] });
    }

    static async findById(id: number): Promise<TravelType | null> {
        return await this.repo.findOne({ 
            where: { travel_type_id: id } as FindOptionsWhere<TravelType>,
            relations: ['routes']
        });
    }

    static async update(
        id: number, 
        data: Partial<Omit<TravelType, 'travel_type_id'>>
    ): Promise<TravelType> {
        const travelType = await this.findById(id);
        if (!travelType) throw new Error("Travel type not found");

        Object.assign(travelType, data);
        return await this.repo.save(travelType);
    }

    static async delete(id: number): Promise<void> {
        const result = await this.repo.delete({ 
            travel_type_id: id 
        } as FindOptionsWhere<TravelType>);
        if (result.affected === 0) throw new Error("Travel type not found");
    }
}