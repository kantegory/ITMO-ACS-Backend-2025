import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Users } from "../models/Users";
import { Recipes } from "../models/Recipes";
import { DishTypes } from "../models/DishTypes";
import { RecipeDifficulties } from "../models/RecipeDifficulties";
import { Ingredients } from "../models/Ingredients";
import { SavedRecipes } from "../models/SavedRecipes";
import { RecipeIngredients } from "../models/RecipeIngredients";
import { RecipeSteps } from "../models/RecipeSteps";
import { Comments } from "../models/Comments";
import { Likes } from "../models/Likes";
import { Subscriptions } from "../models/Subscriptions";
import { Roles } from "../models/Roles";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        Users,
        Roles,
        Recipes,
        DishTypes,
        RecipeDifficulties,
        Ingredients,
        SavedRecipes,
        RecipeIngredients,
        RecipeSteps,
        Comments,
        Likes,
        Subscriptions,
    ],
    migrations: [],
    subscribers: [],
});
