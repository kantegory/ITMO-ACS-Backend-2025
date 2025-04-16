"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipes = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const DishTypes_1 = require("./DishTypes");
const RecipeDifficulties_1 = require("./RecipeDifficulties");
const RecipeSteps_1 = require("./RecipeSteps");
const Comments_1 = require("./Comments");
const Likes_1 = require("./Likes");
const SavedRecipes_1 = require("./SavedRecipes");
const RecipeIngredients_1 = require("./RecipeIngredients");
let Recipes = class Recipes {
};
exports.Recipes = Recipes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recipes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (user) => user.recipes),
    __metadata("design:type", Users_1.Users)
], Recipes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DishTypes_1.DishTypes, (dishType) => dishType.recipes),
    __metadata("design:type", DishTypes_1.DishTypes)
], Recipes.prototype, "dishType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecipeDifficulties_1.RecipeDifficulties, (difficulty) => difficulty.recipes),
    __metadata("design:type", RecipeDifficulties_1.RecipeDifficulties)
], Recipes.prototype, "recipeDifficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Recipes.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Recipes.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Recipes.prototype, "preparation_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Recipes.prototype, "cooking_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Recipes.prototype, "servings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Recipes.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Recipes.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Recipes.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Recipes.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeSteps_1.RecipeSteps, (step) => step.recipe),
    __metadata("design:type", Array)
], Recipes.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments_1.Comments, (comment) => comment.recipe),
    __metadata("design:type", Array)
], Recipes.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes_1.Likes, (like) => like.recipe),
    __metadata("design:type", Array)
], Recipes.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SavedRecipes_1.SavedRecipes, (savedRecipe) => savedRecipe.recipe),
    __metadata("design:type", Array)
], Recipes.prototype, "savedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredients_1.RecipeIngredients, (recipeIngredient) => recipeIngredient.recipe),
    __metadata("design:type", Array)
], Recipes.prototype, "recipeIngredients", void 0);
exports.Recipes = Recipes = __decorate([
    (0, typeorm_1.Entity)()
], Recipes);
