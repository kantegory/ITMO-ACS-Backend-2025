import { Repository } from "typeorm";
import { Property } from "../entity/Property";

export class PropertyService {
  constructor(private readonly propertyRepository: Repository<Property>) {}
  async findAll() {
    const property = await this.propertyRepository.find();
    return property;
  }
  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    return property;
  }

  async createProperty(newproperty: Property) {
    const property = this.propertyRepository.create(newproperty);
    await this.propertyRepository.save(property);
    return property;
  }

  async updateProperty(id: number, data: Partial<Property>) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (property) {
      this.propertyRepository.merge(property, data);
      await this.propertyRepository.save(property);
      return property;
    } else {
      return { message: "Property not found" };
    }
  }

  async delete(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });

    if (property) {
      await this.propertyRepository.remove(property);
      return { message: "Property Deleted successfully" };
    } else {
      return { message: "Property not found" };
    }
  }

}