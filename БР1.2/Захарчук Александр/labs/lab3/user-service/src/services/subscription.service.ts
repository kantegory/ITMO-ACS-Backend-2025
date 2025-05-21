import { BaseService } from "./base.service";
import { Subscription } from "../entities/subscription.entity";
import { BadRequestError, ForbiddenError } from "routing-controllers";
import { DeepPartial } from "typeorm";

export class SubscriptionService extends BaseService<Subscription> {
  constructor() { super(Subscription); }

  async create(data: DeepPartial<Subscription>): Promise<Subscription> {
    if (data.follower_id === data.following_id) {
        throw new BadRequestError();
        
    }
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async deleteWithCheck(id: number, userId: number): Promise<void> {
    const subscription = await this.findOne(id);
    if (subscription.follower_id !== userId) {
        throw new ForbiddenError();
    }
    await this.delete(id);
  }

  async findForUser(userId: number): Promise<Subscription[]> {
    return await this.repository.findBy({follower_id: userId});
  }
}
