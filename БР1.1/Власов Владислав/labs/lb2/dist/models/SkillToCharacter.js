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
exports.SkillToCharacter = void 0;
const typeorm_1 = require("typeorm");
const Character_1 = require("./Character");
const Skill_1 = require("./Skill");
let SkillToCharacter = class SkillToCharacter {
};
exports.SkillToCharacter = SkillToCharacter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SkillToCharacter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], SkillToCharacter.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Skill_1.Skill),
    (0, typeorm_1.JoinColumn)({ name: 'skillId' }),
    __metadata("design:type", Skill_1.Skill)
], SkillToCharacter.prototype, "skill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], SkillToCharacter.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_1.Character, (character) => character.skills),
    (0, typeorm_1.JoinColumn)({ name: 'characterId' }),
    __metadata("design:type", Character_1.Character)
], SkillToCharacter.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], SkillToCharacter.prototype, "characterId", void 0);
exports.SkillToCharacter = SkillToCharacter = __decorate([
    (0, typeorm_1.Entity)()
], SkillToCharacter);
