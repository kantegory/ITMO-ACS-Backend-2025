import { BaseService } from "../common/baseService";
import { Order } from "../entities/Order";

export class OrderService extends BaseService<Order> {
  constructor() {
    super(Order);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["user", "payments"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["user", "payments"] });
  }
}
