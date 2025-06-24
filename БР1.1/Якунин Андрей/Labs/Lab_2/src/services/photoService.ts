import AppDataSource from "../config/AppDataSource";
import { PhotoEntity } from "../entities/photo";
import { AdvertisementEntity } from "../entities/advertisement";
import AdvertisementService from "./advertisementService";
import EntityNotFoundError from "../errors/entity-not-found";

class PhotoService {
    private photoRepo = AppDataSource.getRepository(PhotoEntity);

    async create(data: Partial<PhotoEntity>) {
        // Проверяем, что реклама существует
        if (!data.advertisement || !data.advertisement.id) {
            throw new Error("Advertisement is required");
        }

        const advertisement = await AdvertisementService.getAdvertisementById(data.advertisement.id);
        if (!advertisement) {
            throw new EntityNotFoundError(AdvertisementEntity, data.advertisement.id, "id");
        }

        const photo = this.photoRepo.create({
            path: data.path,
            advertisement,
        });

        return await this.photoRepo.save(photo);
    }

    async getPhotos() {
        return await this.photoRepo.find({ relations: ["advertisement"] });
    }

    async getPhotoById(id: number) {
        const photo = await this.photoRepo.findOne({ where: { id }, relations: ["advertisement"] });
        if (!photo) {
            throw new EntityNotFoundError(PhotoEntity, id, "id");
        }
        return photo;
    }

    async updatePhoto(id: number, data: Partial<PhotoEntity>) {
        const photo = await this.getPhotoById(id);

        if (data.advertisement && data.advertisement.id) {
            const advertisement = await AdvertisementService.getAdvertisementById(data.advertisement.id);
            if (!advertisement) {
                throw new EntityNotFoundError(AdvertisementEntity, data.advertisement.id, "id");
            }
            photo.advertisement = advertisement;
        }

        if (data.path !== undefined) {
            photo.path = data.path;
        }

        return await this.photoRepo.save(photo);
    }

    async deletePhoto(id: number) {
        const result = await this.photoRepo.delete(id);
        if (result.affected === 0) {
            throw new EntityNotFoundError(PhotoEntity, id, "id");
        }
        return { message: `Photo with id ${id} deleted successfully` };
    }
}

export default new PhotoService();
