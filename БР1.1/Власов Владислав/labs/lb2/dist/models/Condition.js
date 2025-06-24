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
exports.Condition = exports.TargetType = exports.ConditionType = void 0;
const typeorm_1 = require("typeorm");
const Effect_1 = require("./Effect");
var ConditionType;
(function (ConditionType) {
    ConditionType["Triggering"] = "triggering";
    ConditionType["Effect"] = "effect";
    ConditionType["Ending"] = "ending";
})(ConditionType || (exports.ConditionType = ConditionType = {}));
var TargetType;
(function (TargetType) {
    TargetType["Target"] = "target";
    TargetType["Self"] = "self";
})(TargetType || (exports.TargetType = TargetType = {}));
let Condition = class Condition {
};
exports.Condition = Condition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Condition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ConditionType,
    }),
    __metadata("design:type", String)
], Condition.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TargetType,
    }),
    __metadata("design:type", String)
], Condition.prototype, "targetType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Condition.prototype, "parameter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Condition.prototype, "operand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Condition.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Effect_1.Effect, effect => effect.conditions, { nullable: false }),
    __metadata("design:type", Effect_1.Effect)
], Condition.prototype, "effect", void 0);
exports.Condition = Condition = __decorate([
    (0, typeorm_1.Entity)()
], Condition);
