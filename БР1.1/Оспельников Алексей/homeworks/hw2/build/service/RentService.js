"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentService = void 0;
class RentService {
    constructor(rentRepository) {
        this.rentRepository = rentRepository;
    }
    async findAll() {
        const rents = await this.rentRepository.find();
        return rents;
    }
    async findOne(id) {
        const rents = await this.rentRepository.findOne({ where: { id } });
        return rents;
    }
    async createRent(newrent) {
        const rent = this.rentRepository.create(newrent);
        await this.rentRepository.save(rent);
        return rent;
    }
    async updateRent(id, data) {
        const rent = await this.rentRepository.findOne({ where: { id } });
        if (rent) {
            this.rentRepository.merge(rent, data);
            await this.rentRepository.save(rent);
            return rent;
        }
        else {
            return { message: "Rent not found" };
        }
    }
    async delete(id) {
        const rent = await this.rentRepository.findOne({ where: { id } });
        if (rent) {
            await this.rentRepository.remove(rent);
            return { message: "Rent Deleted successfully" };
        }
        else {
            return { message: "Rent not found" };
        }
    }
}
exports.RentService = RentService;
//# sourceMappingURL=RentService.js.map