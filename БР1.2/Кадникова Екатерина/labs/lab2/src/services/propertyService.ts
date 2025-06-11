import { AppDataSource } from "../data-source";
import { Property } from "../models/property";
import { User } from "../models/user";
import { Role } from "../models/enums/role";
import { CreatePropertyDto, UpdatePropertyDto, SearchPropertyDto } from "../dto/propertyDto";

const propertyRepository = AppDataSource.getRepository(Property);
const userRepository = AppDataSource.getRepository(User);

class PropertyService {
    async getAllProperties() {
        return propertyRepository.find({ relations: ["owner"] });
    }

    async getPropertyById(id: number) {
        const property = await propertyRepository.findOne({
            where: { id },
            relations: ["owner"]
        });
        if (!property) {
            throw new Error("Property not found");
        }
        return property;
    }

    async createProperty(dto: CreatePropertyDto, userId: number) {
        if (typeof dto.price !== 'number' || isNaN(dto.price)) {
            throw new Error('Price must be a valid number');
        }

        const owner = await userRepository.findOneBy({ id: userId });
        if (!owner) {
            throw new Error("User not found");
        }

        const property = propertyRepository.create({
            ...dto,
            price: dto.price,
            owner
        });

        await propertyRepository.save(property);

        return propertyRepository.findOne({
            where: { id: property.id },
            relations: ["owner"]
        });
    }

    async updateProperty(id: number, dto: UpdatePropertyDto, userId: number, role: Role) {
        const property = await propertyRepository.findOne({
            where: { id },
            relations: ["owner"]
        });

        if (!property) {
            throw new Error("Property not found");
        }

        if (property.owner.id !== userId && role !== Role.ADMIN) {
            throw new Error("Forbidden");
        }

        Object.assign(property, dto);
        await propertyRepository.save(property);

        return property;
    }

    async deleteProperty(id: number, userId: number, role: Role) {
        const property = await propertyRepository.findOne({
            where: { id },
            relations: ["owner"]
        });

        if (!property) {
            throw new Error("Property not found");
        }

        if (property.owner.id !== userId && role !== Role.ADMIN) {
            throw new Error("Forbidden");
        }

        await propertyRepository.remove(property);
        return { message: "Property deleted successfully" };
    }

    async searchProperties(dto: SearchPropertyDto) {
        const qb = propertyRepository.createQueryBuilder("property")
            .leftJoinAndSelect("property.owner", "owner");

        if (dto.location) {
            qb.andWhere("property.location ILIKE :location", { location: `%${dto.location}%` });
        }

        if (dto.minPrice) {
            qb.andWhere("property.price >= :minPrice", { minPrice: Number(dto.minPrice) });
        }

        if (dto.maxPrice) {
            qb.andWhere("property.price <= :maxPrice", { maxPrice: Number(dto.maxPrice) });
        }

        if (dto.propertyType) {
            qb.andWhere("property.property_type = :propertyType", { propertyType: dto.propertyType });
        }

        if (dto.rentalType) {
            qb.andWhere("property.rental_type = :rentalType", { rentalType: dto.rentalType });
        }

        return qb.getMany();
    }
}

export default new PropertyService();