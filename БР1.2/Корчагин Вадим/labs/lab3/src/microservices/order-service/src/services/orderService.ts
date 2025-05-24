import { BaseService } from "../common/baseService";
import { Order } from "../entities/Order";
import axios from "axios";

export class OrderService extends BaseService<Order> {
  constructor() {
    super(Order);
  }

  async findAllWithRelations() {
    const orders = await this.repository.find();
    const enriched = await Promise.all(
      orders.map(async (order) => {
        const user = await this.getUser(order.user_id);
        return { ...order, user };
      })
    );
    return enriched;
  }

  async findOneWithRelations(id: number) {
    const order = await this.repository.findOne({ where: { id } });
    if (!order) return null;
    const user = await this.getUser(order.user_id);
    return { ...order, user };
  }

  private async getUser(userId: number) {
    const { data } = await axios.get(`http://auth-service:3000/users/id/${userId}`);
    return data;
  }
}
