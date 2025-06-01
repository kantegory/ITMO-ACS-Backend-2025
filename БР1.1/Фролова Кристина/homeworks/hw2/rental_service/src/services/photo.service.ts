import { PhotoEntity } from '../models/photo.entity';
import dataSource from '../config/data-source';
import { AdvertisementEntity } from '../models/advertisement.entity';

class PhotoService {
    private repository = dataSource.getRepository(PhotoEntity);

    async createPhotos(urls: string[], ad: AdvertisementEntity) {
        const photos = urls.map(url =>
            this.repository.create({ path: url, advertisement: ad })
        );
        await this.repository.save(photos);
    }
}

export default new PhotoService();
