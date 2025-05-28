import { AppDataSource } from '../config/data-source';
import { PropertyPhoto } from '../models/photo.entity';
import { CreatePhotoDto, UpdatePhotoDto } from '../dto/photo.dto';

const photoRepo = AppDataSource.getRepository(PropertyPhoto);

export class PhotoService {
    static createPhoto(dto: CreatePhotoDto) {
        const entity = photoRepo.create({
            photo_url: dto.photo_url,
            description: dto.description,
            property: { property_id: dto.property_id } as any,
        });
        return photoRepo.save(entity);
    }

    static getAllPhotos() {
        return photoRepo.find({ relations: ['property'] });
    }

    static getPhotoById(id: number) {
        return photoRepo.findOne({
            where: { photo_id: id },
            relations: ['property'],
        });
    }

    static async updatePhoto(id: number, dto: UpdatePhotoDto) {
        await photoRepo.update({ photo_id: id }, dto);
        return this.getPhotoById(id);
    }

    static deletePhoto(id: number) {
        return photoRepo.delete({ photo_id: id });
    }
}