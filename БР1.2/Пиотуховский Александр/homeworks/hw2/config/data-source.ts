import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import {DataSource} from 'typeorm';
import {Comment} from "../models/Comment";
import {DishType} from "../models/DishType";
import {Follower} from "../models/Follower";
import {Ingredient} from "../models/Ingredient";
import {Permission} from '../models/Permission';
import {Post} from "../models/Post";
import {PostFavorite} from "../models/PostFavorite";
import {PostImage} from "../models/PostImage";
import {PostToRecipe} from "../models/PostToRecipe";
import {Recipe} from "../models/Recipe";
import {RecipeBlock} from "../models/RecipeBlock";
import {RecipeFavorite} from "../models/RecipeFavorite";
import {RecipeIngredient} from "../models/RecipeIngredient";
import {Role} from "../models/Role";
import {User} from "../models/User";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'youshallnotpass',
    database: process.env.DB_NAME || 'postgres',
    synchronize: true,
    logging: false,
    entities: [
        Comment,
        DishType,
        Follower,
        Ingredient,
        Permission,
        Post,
        PostFavorite,
        PostImage,
        PostToRecipe,
        Recipe,
        RecipeBlock,
        RecipeFavorite,
        RecipeIngredient,
        Role,
        User
    ],
});
