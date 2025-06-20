import { BaseService } from "./base.service";
import { Ingredient } from "../entities/Ingredient";

export class IngredientService extends BaseService<Ingredient> {
    constructor() { super(Ingredient); }
}
