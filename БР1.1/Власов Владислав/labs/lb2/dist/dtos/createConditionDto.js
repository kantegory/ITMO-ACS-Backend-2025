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
exports.CreateConditionDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Condition_1 = require("../models/Condition");
class CreateConditionDto {
}
exports.CreateConditionDto = CreateConditionDto;
__decorate([
    (0, class_validator_1.IsEnum)(Condition_1.ConditionType),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateConditionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Condition_1.TargetType),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateConditionDto.prototype, "targetType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateConditionDto.prototype, "parameter", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateConditionDto.prototype, "operand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CreateConditionDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateConditionDto.prototype, "effect", void 0);
