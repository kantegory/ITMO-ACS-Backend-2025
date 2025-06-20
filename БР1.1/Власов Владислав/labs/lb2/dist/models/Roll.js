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
exports.Roll = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Character_1 = require("./Character");
const Effect_1 = require("./Effect");
let Roll = class Roll {
};
exports.Roll = Roll;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Roll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Roll.prototype, "diceResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Roll.prototype, "WildDiceResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Roll.prototype, "ability", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.messages),
    __metadata("design:type", User_1.User)
], Roll.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_1.Character, character => character.rolls),
    __metadata("design:type", Character_1.Character)
], Roll.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Effect_1.Effect),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Roll.prototype, "effects", void 0);
exports.Roll = Roll = __decorate([
    (0, typeorm_1.Entity)()
], Roll);
