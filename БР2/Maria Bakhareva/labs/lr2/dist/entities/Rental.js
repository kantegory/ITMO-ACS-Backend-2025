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
exports.Rental = exports.RentalStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Property_1 = require("./Property");
const Message_1 = require("./Message");
const Chat_1 = require("./Chat");
var RentalStatus;
(function (RentalStatus) {
    RentalStatus["CREATED"] = "created";
    RentalStatus["INSPECTING"] = "inspecting";
    RentalStatus["PUBLISHED"] = "published";
    RentalStatus["HIDDEN"] = "hidden";
    RentalStatus["CANCELED"] = "canceled";
})(RentalStatus || (exports.RentalStatus = RentalStatus = {}));
let Rental = class Rental {
};
exports.Rental = Rental;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'rental_id' }),
    __metadata("design:type", Number)
], Rental.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.rentals),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", User_1.User)
], Rental.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Property_1.Property, (property) => property.rentals),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", Property_1.Property)
], Rental.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", Date)
], Rental.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    __metadata("design:type", Date)
], Rental.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rental.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Rental.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (msg) => msg.rental),
    __metadata("design:type", Array)
], Rental.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, (chat) => chat.rental),
    __metadata("design:type", Array)
], Rental.prototype, "chats", void 0);
exports.Rental = Rental = __decorate([
    (0, typeorm_1.Entity)()
], Rental);
