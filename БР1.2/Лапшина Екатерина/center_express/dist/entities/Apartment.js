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
exports.Apartment = void 0;
const typeorm_1 = require("typeorm");
const Building_1 = require("./Building");
const Contract_1 = require("./Contract");
let Apartment = class Apartment {
};
exports.Apartment = Apartment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Apartment.prototype, "ApartmentID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Apartment.prototype, "Number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Apartment.prototype, "Square", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Apartment.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Apartment.prototype, "Photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Apartment.prototype, "Cost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Building_1.Building, building => building.Apartments),
    __metadata("design:type", Building_1.Building)
], Apartment.prototype, "Building", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Contract_1.Contract, contract => contract.ApartmentID),
    __metadata("design:type", Array)
], Apartment.prototype, "Contracts", void 0);
exports.Apartment = Apartment = __decorate([
    (0, typeorm_1.Entity)("apartments")
], Apartment);
//# sourceMappingURL=Apartment.js.map