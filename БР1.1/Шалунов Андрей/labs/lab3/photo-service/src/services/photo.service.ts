import { AppDataSource } from '../config/data-source'
import { Photo } from '../models/photo.entity'
import { CreatePhotoDto,UpdatePhotoDto } from '../dto/photo.dto'
import { fetchProperty } from '../clients/property.client'
import { NotFoundError } from 'routing-controllers'
import { Property } from '../models/property.entity'

const repo = AppDataSource.getRepository(Photo)
const propertyRepo = AppDataSource.getRepository(Property)

export class PhotoService {
    static async createPhoto (
        dto:CreatePhotoDto,
        authHeader?:string
    ) {
        const rp = await fetchProperty(dto.property_id, authHeader)
        let lp = await propertyRepo.findOneBy({property_id:dto.property_id})
        if (!lp) {
            lp = propertyRepo.create({
                property_id:dto.property_id,
                type:rp.type,
                title:rp.title,
                description:rp.description,
                location:rp.location,
                price_per_day:rp.price_per_day,
                status:rp.status
            })
            await propertyRepo.save(lp)
        }
        const p = repo.create({
            property:lp,
            photo_url:dto.photo_url,
            description:dto.description
        })
        return repo.save(p)
    }

    static getAllPhotos(){ 
        return repo.find({relations:['property']}) 
    }

    static async getPhotoById(id:number) {
        const p=await repo.findOne({
            where:{photo_id:id}, 
            relations:['property']
        })
        if(!p) throw new NotFoundError('Photo not found')
        return p
    }

    static async updatePhoto(
        id:number,
        dto:UpdatePhotoDto
    ) {
        await repo.update({photo_id:id}, dto)
        return this.getPhotoById(id)
    }

    static async deletePhoto(id:number){
        const r = await repo.delete({photo_id:id})
        if (r.affected===0) throw new NotFoundError('Photo not found')
    }
}