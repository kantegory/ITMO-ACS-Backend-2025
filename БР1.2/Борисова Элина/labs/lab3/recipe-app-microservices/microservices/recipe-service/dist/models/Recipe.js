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
exports.Recipe = void 0;
const typeorm_1 = require("typeorm");
const DishType_1 = require("./DishType");
const RecipeDifficulty_1 = require("./RecipeDifficulty");
const RecipeStep_1 = require("./RecipeStep");
const RecipeIngredient_1 = require("./RecipeIngredient");
/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - dishType
 *         - recipeDifficulty
 *         - title
 *         - preparation_time
 *         - cooking_time
 *         - servings
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         dishType:
 *           $ref: '#/components/schemas/DishType'
 *         recipeDifficulty:
 *           $ref: '#/components/schemas/RecipeDifficulty'
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         preparation_time:
 *           type: integer
 *         cooking_time:
 *           type: integer
 *         servings:
 *           type: integer
 *         image:
 *           type: string
 *         video:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStep'
 *         recipeIngredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 */
let Recipe = class Recipe {
};
exports.Recipe = Recipe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DishType_1.DishType, (dishType) => dishType.recipes, { nullable: false }),
    __metadata("design:type", DishType_1.DishType)
], Recipe.prototype, "dishType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RecipeDifficulty_1.RecipeDifficulty, (difficulty) => difficulty.recipes, { nullable: false }),
    __metadata("design:type", RecipeDifficulty_1.RecipeDifficulty)
], Recipe.prototype, "recipeDifficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "preparation_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "cooking_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "servings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], Recipe.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], Recipe.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeStep_1.RecipeStep, (step) => step.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredient_1.RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipeIngredients", void 0);
exports.Recipe = Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
