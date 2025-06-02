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
exports.PropertyImage = void 0;
const typeorm_1 = require("typeorm");
const Property_1 = require("./Property");
let PropertyImage = class PropertyImage {
};
exports.PropertyImage = PropertyImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'image_id' }),
    __metadata("design:type", Number)
], PropertyImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Property_1.Property, (property) => property.images),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", Property_1.Property)
], PropertyImage.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], PropertyImage.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PropertyImage.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PropertyImage.prototype, "createdAt", void 0);
exports.PropertyImage = PropertyImage = __decorate([
    (0, typeorm_1.Entity)()
], PropertyImage);
