import { BaseService } from "./base.service";
import { Comment } from "../entities/comment.entity";
import { DeepPartial } from "typeorm";
import axios from "axios";
import { ForbiddenError, NotFoundError } from "routing-controllers";

export class CommentService extends BaseService<Comment> {
  constructor() { super(Comment); }

  async create(data: DeepPartial<Comment>): Promise<Comment> {
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

  async getByRecipeId(recipeId: number): Promise<Comment[]> {
    return this.repository.findBy({recipe_id: recipeId});
  }

  async updateWithCheck(id: number, userId: number, data: Partial<Comment>): Promise<Comment> {
    const like = await this.findOne(id);
    if (like.user_id !== userId) {
      throw new ForbiddenError();
    }
    return await this.update(id, data);
  }

  async deleteWithCheck(id: number, userId: number): Promise<void> {
    const like = await this.findOne(id);
    if (like.user_id !== userId) {
      throw new ForbiddenError();
    }
    await this.repository.delete(id);
  }
}
