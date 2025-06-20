import { AppDataSource } from '../config/data-source';
import { Property } from '../models/property.entity';
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/property.dto';

const propertyRepo = AppDataSource.getRepository(Property);

export class PropertyService {
    static async createProperty(dto: CreatePropertyDto) {
        const { owner_id, price_per_day, ...rest } = dto;

        const entity = propertyRepo.create({
            ...rest,
            price_per_day: price_per_day.toString(),
            owner: { user_id: owner_id },
        });

        return propertyRepo.save(entity);
    }

    static getAllProperties() {
        return propertyRepo.find({
            relations: ['owner', 'photos', 'bookings'],
        });
    }

    static getPropertyById(id: number) {
        return propertyRepo.findOne({
            where: { property_id: id },
            relations: ['owner', 'photos', 'bookings'],
        });
    }

    static async updateProperty(id: number, dto: UpdatePropertyDto) {
        const update: Partial<Record<keyof UpdatePropertyDto, any>> = { ...dto };
        if (dto.price_per_day !== undefined) {
            update.price_per_day = dto.price_per_day.toString();
        }

        await propertyRepo.update({ property_id: id }, update);
        return this.getPropertyById(id);
    }

    static deleteProperty(id: number) {
        return propertyRepo.delete({ property_id: id });
    }
}