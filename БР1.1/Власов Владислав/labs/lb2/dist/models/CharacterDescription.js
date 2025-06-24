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
exports.CharacterDescription = void 0;
const typeorm_1 = require("typeorm");
let CharacterDescription = class CharacterDescription {
};
exports.CharacterDescription = CharacterDescription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CharacterDescription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], CharacterDescription.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], CharacterDescription.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "" }),
    __metadata("design:type", String)
], CharacterDescription.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: "" }),
    __metadata("design:type", String)
], CharacterDescription.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], CharacterDescription.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], CharacterDescription.prototype, "notes", void 0);
exports.CharacterDescription = CharacterDescription = __decorate([
    (0, typeorm_1.Entity)()
], CharacterDescription);
