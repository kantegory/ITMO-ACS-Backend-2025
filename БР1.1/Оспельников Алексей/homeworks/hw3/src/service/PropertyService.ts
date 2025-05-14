import { Repository } from "typeorm";
import { Property } from "../entity/Property";

export class PropertyService {
  constructor(private readonly propertyRepository: Repository<Property>) {}
  async findAll() {
    const property = await this.propertyRepository.find();
    return { 'status': 200, 'data': property, message: "Properties found"  };
  }

  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      return { 'status': 404, 'data': null, message: "Property not found" }
    }
    return { 'status': 200, 'data': property, message: "Property found" };
  }

  async createProperty(newproperty: Property) {
    try {
        const property = this.propertyRepository.create(newproperty);
        const savedProperty = await this.propertyRepository.save(property);
        return { 'status': 201, 'data': savedProperty, 'message': 'Successfully created' };
    } 
    catch (error) {
        return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
    }
  }

  async updateProperty(id: number, data: Partial<Property>) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (property) {
      try {
        this.propertyRepository.merge(property, data);
        const savedProperty = await this.propertyRepository.save(property);
        return { 'status': 201, 'data': savedProperty, message: 'Successfully updated' };
      } 
      catch (error) {
        return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
      }
    } else {
      return { 'status': 404, 'data': null, message: "Property not found" };
    }
  }

  async delete(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });

    if (property) {
      await this.propertyRepository.remove(property);
      return { 'status': 204, 'message': "Property Deleted successfully" };
    } else {
      return { 'status': 404, 'message': "Property not found" };
    }
  }

}