import dataSource from '../config/data-source';
import EntityNotFoundError from '../errors/entity-not-found.error';
import {PhotoEntity} from "../entities/photo.entity";
import {Photo} from "../models/models/photo.model";
import advertisementService from "./advertisement.service";
import {entityToPhoto} from "../mappers/photo.mapper";
import {CreatePhotoModel} from "../models/requests/photo/photo-create-request.model";
import {UpdatePhotoRequestModel} from "../models/requests/photo/photo-update-request.model";
import {AdvertisementEntity} from "../entities/advertisement.entity";

class PhotoService {
    private repository = dataSource.getRepository(PhotoEntity);

    async getById(id: number): Promise<Photo> {
        const photo = await this.repository.findOne({
            where: { id },
            relations: ['advertisement'],
        });
        if (!photo) throw new EntityNotFoundError(PhotoEntity, id, "id");
        return entityToPhoto(photo);
    }

    async getAll(): Promise<Photo[]> {
        const photos = await this.repository.find({
            relations: ['advertisement'],
        });
        return photos.map(entityToPhoto);
    }

    async getPhotosByAdvertisementId(advertisementId: number): Promise<Photo[]> {
        const photos = await this.repository.find({
            where: { advertisement: { id: advertisementId } },
            relations: ['advertisement'],
        });
        return photos.map(entityToPhoto);
    }

    async create(advertisementId: number, data: CreatePhotoModel): Promise<Photo> {
        const advertisement = await advertisementService.getById(advertisementId);
        const photoEntity = this.repository.create({
            advertisement,
            path: data.path,
        });
        const saved = await this.repository.save(photoEntity);
        return entityToPhoto(saved);
    }

    async createMany(advertisement: AdvertisementEntity, models: CreatePhotoModel[]): Promise<void> {
        const photos = models.map(model =>
            this.repository.create({
                advertisement,
                path: model.path,
            })
        );

        await this.repository.save(photos);
    }

    async update(id: number, data: UpdatePhotoRequestModel): Promise<Photo> {
        const photo = await this.repository.findOne({
            where: { id },
            relations: ['advertisement'],
        });
        if (!photo) throw new EntityNotFoundError(PhotoEntity, id, "id");
        Object.assign(photo, data);
        const updated = await this.repository.save(photo);
        return entityToPhoto(updated);
    }

    async delete(id: number): Promise<void> {
        const photo = await this.repository.findOneBy({ id });
        if (!photo) throw new EntityNotFoundError(PhotoEntity, id, "id");
        await this.repository.remove(photo);
    }
}

export default new PhotoService();
