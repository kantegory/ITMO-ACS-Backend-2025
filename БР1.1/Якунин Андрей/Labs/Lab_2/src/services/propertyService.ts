import AppDataSource from "../config/AppDataSource";
import  { PropertyEntity } from "../entities/property";
import EntityNotFoundError from "../errors/entity-not-found";

class PropertyService {
    private propertyRepo = AppDataSource.getRepository(PropertyEntity);

    async createProperty(data: Partial<PropertyEntity>){
        const property = this.propertyRepo.create(data);
        return await this.propertyRepo.save(property);
    }

    async getAllPropertys(){
        return await this.propertyRepo.find();
    }

    async getPropertyById(id:number){
        return this.propertyRepo.findOne({where:{id}});
    }

    async deleteProperty(id:number){
        return this.propertyRepo.delete(id)
    }

    async updatePropery(id:number, data:any){
        const entity = this.getPropertyById(id)
        return await this.propertyRepo.update(id,data)
    }
}

export default new PropertyService();