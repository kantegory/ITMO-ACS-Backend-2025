"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentService = void 0;
class RentService {
    constructor(rentRepository) {
        this.rentRepository = rentRepository;
    }
    async findAll() {
        const rent = await this.rentRepository.find();
        return { 'status': 200, 'data': rent, message: "Rents found" };
    }
    async findOne(id) {
        const rent = await this.rentRepository.findOne({ where: { id } });
        if (!rent) {
            return { 'status': 404, 'data': null, message: "Rent not found" };
        }
        return { 'status': 200, 'data': rent, message: "Rent found" };
    }
    async createRent(newrent) {
        try {
            const rent = this.rentRepository.create(newrent);
            const savedRent = await this.rentRepository.save(rent);
            return { 'status': 201, 'data': savedRent, 'message': 'Successfully created' };
        }
        catch (error) {
            return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
        }
    }
    async updateRent(id, data) {
        const rent = await this.rentRepository.findOne({ where: { id } });
        if (rent) {
            try {
                this.rentRepository.merge(rent, data);
                const savedRent = await this.rentRepository.save(rent);
                return { 'status': 200, 'data': savedRent, message: 'Successfully updated' };
            }
            catch (error) {
                return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
            }
        }
        else {
            return { 'status': 404, 'data': null, message: "Rent not found" };
        }
    }
    async delete(id) {
        const rent = await this.rentRepository.findOne({ where: { id } });
        if (rent) {
            await this.rentRepository.remove(rent);
            return { 'status': 200, 'message': "Rent Deleted successfully" };
        }
        else {
            return { 'status': 404, 'message': "Rent not found" };
        }
    }
}
exports.RentService = RentService;
//# sourceMappingURL=RentService.js.map