import { Repository } from "typeorm";
import { Rent } from "../entity/Rent";

export class RentService {
  constructor(private readonly rentRepository: Repository<Rent>) {}
  async findAll() {
    const rents = await this.rentRepository.find();
    return rents;
  }
  async findOne(id: number) {
    const rents = await this.rentRepository.findOne({ where: { id } });
    return rents;
  }

  async createRent(newrent: Rent) {
    const rent = this.rentRepository.create(newrent);
    await this.rentRepository.save(rent);
    return rent;
  }

  async updateRent(id: number, data: Partial<Rent>) {
    const rent = await this.rentRepository.findOne({ where: { id } });
    if (rent) {
      this.rentRepository.merge(rent, data);
      await this.rentRepository.save(rent);
      return rent;
    } else {
      return { message: "Rent not found" };
    }
  }

  async delete(id: number) {
    const rent = await this.rentRepository.findOne({ where: { id } });

    if (rent) {
      await this.rentRepository.remove(rent);
      return { message: "Rent Deleted successfully" };
    } else {
      return { message: "Rent not found" };
    }
  }

}