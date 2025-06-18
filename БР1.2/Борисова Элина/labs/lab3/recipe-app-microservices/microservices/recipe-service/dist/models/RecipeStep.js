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
exports.RecipeStep = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("./Recipe");
/**
 * @openapi
 * components:
 *   schemas:
 *     RecipeStep:
 *       type: object
 *       required:
 *         - id
 *         - step_number
 *         - instruction
 *         - recipe
 *       properties:
 *         id:
 *           type: integer
 *         step_number:
 *           type: integer
 *         instruction:
 *           type: string
 *         image:
 *           type: string
 *           nullable: true
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */
let RecipeStep = class RecipeStep {
};
exports.RecipeStep = RecipeStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecipeStep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Recipe_1.Recipe, (recipe) => recipe.steps, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", Recipe_1.Recipe)
], RecipeStep.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], RecipeStep.prototype, "step_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], RecipeStep.prototype, "instruction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], RecipeStep.prototype, "image", void 0);
exports.RecipeStep = RecipeStep = __decorate([
    (0, typeorm_1.Index)(['recipe', 'step_number'], { unique: true }),
    (0, typeorm_1.Entity)()
], RecipeStep);
