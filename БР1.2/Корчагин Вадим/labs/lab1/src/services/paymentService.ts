import { BaseService } from "../common/baseService";
import { Payment } from "../entities/Payment";

export class PaymentService extends BaseService<Payment> {
  constructor() {
    super(Payment);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["order"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["order"] });
  }
}
