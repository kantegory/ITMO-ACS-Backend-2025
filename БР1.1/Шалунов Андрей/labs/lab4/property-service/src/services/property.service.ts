import { AppDataSource } from '../config/data-source'
import { Property } from '../models/property.entity'
import { User } from '../models/user.entity'
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/property.dto'
import { fetchUser } from '../clients/user.client'
import { NotFoundError } from 'routing-controllers'

const propertyRepo = AppDataSource.getRepository(Property)
const userRepo = AppDataSource.getRepository(User)

export class PropertyService {
    static async createProperty(
        dto: CreatePropertyDto,
        authHeader?: string
    ) {
        const remoteUser = await fetchUser(dto.owner_id, authHeader)

        let localUser = await userRepo.findOneBy({ user_id: dto.owner_id })
        if (!localUser) {
            localUser = userRepo.create({
                user_id: dto.owner_id,
                name: remoteUser.name,
                email: remoteUser.email,
                phone: remoteUser.phone ?? null
            })
            await userRepo.save(localUser)
        }

        const entity = propertyRepo.create({
            owner: localUser,
            type: dto.type,
            title: dto.title,
            description: dto.description,
            location: dto.location,
            price_per_day: dto.price_per_day,
            status: dto.status
        })
        return propertyRepo.save(entity)
    }

    static getAllProperties() {
        return propertyRepo.find({ relations: ['owner'] })
    }

    static async getPropertyById(id: number) {
        const p = await propertyRepo.findOne({
            where: { property_id: id },
            relations: ['owner']
        })
        if (!p) throw new NotFoundError('Property not found')
        return p
    }

    static async updateProperty(
        id: number,
        dto: UpdatePropertyDto,
        authHeader?: string
    ) {
        if (dto.owner_id) {
            await fetchUser(dto.owner_id, authHeader)
        }
        await propertyRepo.update({ property_id: id }, dto)
        return this.getPropertyById(id)
    }

    static async deleteProperty(id: number) {
        const res = await propertyRepo.delete({ property_id: id })
        if (res.affected === 0) throw new NotFoundError('Property not found')
    }
}