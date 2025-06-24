import dataSource from '../config/data-source';
import {PropertyEntity} from "../entities/property.entity";
import {AdvertisementEntity} from "../entities/advertisement.entity";
import {CreatePropertyModel} from "../models/requests/property/property-create-request.model";
import livingService from "./living.service";

class PropertyService {
    private repository = dataSource.getRepository(PropertyEntity);

    async create(advertisement: AdvertisementEntity, model: CreatePropertyModel): Promise<void> {
        const property = this.repository.create({
            advertisement,
            totalArea: model.totalArea,
            location: model.location,
        });
        await property.save();
        await livingService.create(property, model.living);
    }
}

export default new PropertyService();
