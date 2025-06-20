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
exports.Effect = exports.EffectType = void 0;
const typeorm_1 = require("typeorm");
const Condition_1 = require("./Condition");
const EffectToCharacter_1 = require("./EffectToCharacter");
var EffectType;
(function (EffectType) {
    EffectType["Attact"] = "attack";
    EffectType["Defence"] = "defence";
    EffectType["Universal"] = "universal";
})(EffectType || (exports.EffectType = EffectType = {}));
let Effect = class Effect {
};
exports.Effect = Effect;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Effect.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Effect.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], Effect.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EffectType,
        default: EffectType.Universal
    }),
    __metadata("design:type", String)
], Effect.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Effect.prototype, "isTemp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        type: 'integer'
    }),
    __metadata("design:type", Number)
], Effect.prototype, "ActionTime", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Condition_1.Condition, condition => condition.effect),
    __metadata("design:type", Array)
], Effect.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EffectToCharacter_1.EffectToCharacter, character => character.effect),
    __metadata("design:type", Array)
], Effect.prototype, "characters", void 0);
exports.Effect = Effect = __decorate([
    (0, typeorm_1.Entity)()
], Effect);
