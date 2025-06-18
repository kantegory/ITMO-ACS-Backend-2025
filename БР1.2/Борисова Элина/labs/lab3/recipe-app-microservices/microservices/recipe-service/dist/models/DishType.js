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
exports.DishType = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("./Recipe");
/**
 * @openapi
 * components:
 *   schemas:
 *     DishType:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */
let DishType = class DishType {
};
exports.DishType = DishType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DishType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], DishType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Recipe_1.Recipe, (recipe) => recipe.dishType),
    __metadata("design:type", Array)
], DishType.prototype, "recipes", void 0);
exports.DishType = DishType = __decorate([
    (0, typeorm_1.Entity)()
], DishType);
