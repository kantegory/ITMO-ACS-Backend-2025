import { ForbiddenError } from "routing-controllers";
import { Recipe } from "../entities/Recipe";
import { BaseService } from "./base.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class RecipeService extends BaseService<Recipe> {
    constructor() { super(Recipe); }

    async findAll(): Promise<Recipe[]> {
        return super.findAll(["ingredients"]);
    }

    async findOne(id: number): Promise<Recipe | null> {
        return super.findOne(id, ["ingredients"])
    }

    async updateWithCheck(id: number, userId: number, data: QueryDeepPartialEntity<Recipe>): Promise<Recipe> {
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
