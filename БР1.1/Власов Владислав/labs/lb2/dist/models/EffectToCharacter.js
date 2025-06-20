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
exports.EffectToCharacter = void 0;
const typeorm_1 = require("typeorm");
const Character_1 = require("./Character");
const Effect_1 = require("./Effect");
let EffectToCharacter = class EffectToCharacter {
};
exports.EffectToCharacter = EffectToCharacter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EffectToCharacter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Effect_1.Effect),
    (0, typeorm_1.JoinColumn)({ name: 'effectId' }),
    __metadata("design:type", Effect_1.Effect)
], EffectToCharacter.prototype, "effect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], EffectToCharacter.prototype, "effectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_1.Character, (character) => character.effects),
    (0, typeorm_1.JoinColumn)({ name: 'characterId' }),
    __metadata("design:type", Character_1.Character)
], EffectToCharacter.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], EffectToCharacter.prototype, "characterId", void 0);
exports.EffectToCharacter = EffectToCharacter = __decorate([
    (0, typeorm_1.Entity)()
], EffectToCharacter);
