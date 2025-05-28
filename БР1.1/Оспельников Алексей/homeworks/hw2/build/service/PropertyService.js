"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
class PropertyService {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async findAll() {
        const property = await this.propertyRepository.find();
        return property;
    }
    async findOne(id) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        return property;
    }
    async createProperty(newproperty) {
        const property = this.propertyRepository.create(newproperty);
        await this.propertyRepository.save(property);
        return property;
    }
    async updateProperty(id, data) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (property) {
            this.propertyRepository.merge(property, data);
            await this.propertyRepository.save(property);
            return property;
        }
        else {
            return { message: "Property not found" };
        }
    }
    async delete(id) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (property) {
            await this.propertyRepository.remove(property);
            return { message: "Property Deleted successfully" };
        }
        else {
            return { message: "Property not found" };
        }
    }
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=PropertyService.js.map