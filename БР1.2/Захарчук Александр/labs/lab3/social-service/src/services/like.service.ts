import { BaseService } from "./base.service";
import { Like } from "../entities/like.entity";
import { ForbiddenError, NotFoundError } from "routing-controllers";
import { DeepPartial } from "typeorm";
import axios from "axios";

export class LikeService extends BaseService<Like> {
  constructor() { super(Like); }

  async create(data: DeepPartial<Like>): Promise<Like> {
    try {
      const response = await axios.get(`${process.env.RECIPE_SERVICE_URL}/${data.recipe_id}`);
      if (response.status !== 200) {
        throw new NotFoundError();
      }
    }
    catch (error) {
      throw new NotFoundError();
    }
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async deleteWithCheck(id: number, userId: number): Promise<void> {
    const like = await this.findOne(id);
    if (like.user_id !== userId) {
      throw new ForbiddenError();
    }
    await this.repository.delete(id);
  }

  async findAllForUser(userId: number): Promise<Like[]> {
    return await this.repository.findBy({user_id: userId});
  }
}
