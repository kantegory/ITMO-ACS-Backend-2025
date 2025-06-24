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
exports.Character = exports.CharacterRank = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const CharacterDescription_1 = require("./CharacterDescription");
const SkillToCharacter_1 = require("./SkillToCharacter");
const Roll_1 = require("./Roll");
const Race_1 = require("./Race");
const Edge_1 = require("./Edge");
const ItemToCharacter_1 = require("./ItemToCharacter");
const EffectToCharacter_1 = require("./EffectToCharacter");
var CharacterRank;
(function (CharacterRank) {
    CharacterRank["NOVICE"] = "novice";
    CharacterRank["SEASONER"] = "seasoner";
    CharacterRank["VETERAN"] = "veteran";
    CharacterRank["HEROIC"] = "heroic";
    CharacterRank["LEGEND"] = "legend";
})(CharacterRank || (exports.CharacterRank = CharacterRank = {}));
let Character = class Character {
};
exports.Character = Character;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.characters),
    (0, typeorm_1.JoinColumn)({ name: 'playerId' }),
    __metadata("design:type", User_1.User)
], Character.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Character.prototype, "playerId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Character.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "" }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Character.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "agility", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "smarts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "spirit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "strenght", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "vigor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 6 }),
    __metadata("design:type", Number)
], Character.prototype, "pace", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 6 }),
    __metadata("design:type", Number)
], Character.prototype, "run", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 2 }),
    __metadata("design:type", Number)
], Character.prototype, "parry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 4 }),
    __metadata("design:type", Number)
], Character.prototype, "toughness", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Character.prototype, "armor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Character.prototype, "hp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Character.prototype, "wounds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Character.prototype, "fatigue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 2 }),
    __metadata("design:type", Number)
], Character.prototype, "maxFatigue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Character.prototype, "isShaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Character.prototype, "isDead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 10 }),
    __metadata("design:type", Number)
], Character.prototype, "maxWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Character.prototype, "isWildCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 6 }),
    __metadata("design:type", Number)
], Character.prototype, "wildDice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Character.prototype, "advance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CharacterRank,
        default: CharacterRank.NOVICE,
    }),
    __metadata("design:type", String)
], Character.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Character.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => CharacterDescription_1.CharacterDescription, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", CharacterDescription_1.CharacterDescription)
], Character.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Race_1.Race),
    __metadata("design:type", Race_1.Race)
], Character.prototype, "race", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Roll_1.Roll, roll => roll.character),
    __metadata("design:type", Array)
], Character.prototype, "rolls", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Edge_1.Edge),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Character.prototype, "edges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SkillToCharacter_1.SkillToCharacter, skill => skill.character),
    __metadata("design:type", Array)
], Character.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ItemToCharacter_1.ItemToCharacter, item => item.character),
    __metadata("design:type", Array)
], Character.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EffectToCharacter_1.EffectToCharacter, effect => effect.character),
    __metadata("design:type", Array)
], Character.prototype, "effects", void 0);
exports.Character = Character = __decorate([
    (0, typeorm_1.Entity)()
], Character);
