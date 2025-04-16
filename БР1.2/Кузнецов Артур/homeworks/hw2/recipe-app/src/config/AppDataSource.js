"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const Users_1 = require("../models/Users");
const Recipes_1 = require("../models/Recipes");
const DishTypes_1 = require("../models/DishTypes");
const RecipeDifficulties_1 = require("../models/RecipeDifficulties");
const Ingredients_1 = require("../models/Ingredients");
const SavedRecipes_1 = require("../models/SavedRecipes");
const RecipeIngredients_1 = require("../models/RecipeIngredients");
const RecipeSteps_1 = require("../models/RecipeSteps");
const Comments_1 = require("../models/Comments");
const Likes_1 = require("../models/Likes");
const Subscriptions_1 = require("../models/Subscriptions");
const Roles_1 = require("../models/Roles");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        Users_1.Users,
        Roles_1.Roles,
        Recipes_1.Recipes,
        DishTypes_1.DishTypes,
        RecipeDifficulties_1.RecipeDifficulties,
        Ingredients_1.Ingredients,
        SavedRecipes_1.SavedRecipes,
        RecipeIngredients_1.RecipeIngredients,
        RecipeSteps_1.RecipeSteps,
        Comments_1.Comments,
        Likes_1.Likes,
        Subscriptions_1.Subscriptions,
    ],
    migrations: [],
    subscribers: [],
});
