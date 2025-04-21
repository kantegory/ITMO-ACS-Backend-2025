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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
const typeorm_1 = require("typeorm");
let Rent = class Rent {
};
exports.Rent = Rent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Rent.prototype, "guest_count", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rent.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Rent.prototype, "start_rent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Rent.prototype, "end_rent", void 0);
__decorate([
    ManyToOne(() => User, user => user.tenants),
    __metadata("design:type", typeof (_a = typeof User !== "undefined" && User) === "function" ? _a : Object)
], Rent.prototype, "tenant", void 0);
__decorate([
    ManyToOne(() => Property, property => property.rents),
    __metadata("design:type", typeof (_b = typeof Property !== "undefined" && Property) === "function" ? _b : Object)
], Rent.prototype, "estate", void 0);
__decorate([
    OneToMany(() => Review, review => review.rent),
    __metadata("design:type", Array)
], Rent.prototype, "review", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Rent.prototype, "created_at", void 0);
exports.Rent = Rent = __decorate([
    (0, typeorm_1.Entity)()
], Rent);
//# sourceMappingURL=Rent.js.map