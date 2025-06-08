"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
class PropertyService {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    async findAll() {
        const property = await this.propertyRepository.find();
        return { 'status': 200, 'data': property, message: "Properties found" };
    }
    async findOne(id) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (!property) {
            return { 'status': 404, 'data': null, message: "Property not found" };
        }
        return { 'status': 200, 'data': property, message: "Property found" };
    }
    async createProperty(newproperty) {
        try {
            const property = this.propertyRepository.create(newproperty);
            const savedProperty = await this.propertyRepository.save(property);
            return { 'status': 201, 'data': savedProperty, 'message': 'Successfully created' };
        }
        catch (error) {
            return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
        }
    }
    async updateProperty(id, data) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (property) {
            try {
                this.propertyRepository.merge(property, data);
                const savedProperty = await this.propertyRepository.save(property);
                return { 'status': 200, 'data': savedProperty, message: 'Successfully updated' };
            }
            catch (error) {
                return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
            }
        }
        else {
            return { 'status': 404, 'data': null, message: "Property not found" };
        }
    }
    async delete(id) {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (property) {
            await this.propertyRepository.remove(property);
            return { 'status': 200, 'message': "Property Deleted successfully" };
        }
        else {
            return { 'status': 404, 'message': "Property not found" };
        }
    }
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=PropertyService.js.map