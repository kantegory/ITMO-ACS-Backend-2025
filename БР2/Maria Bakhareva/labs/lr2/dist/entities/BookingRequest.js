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
exports.BookingRequest = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Property_1 = require("./Property");
let BookingRequest = class BookingRequest {
};
exports.BookingRequest = BookingRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'request_id' }),
    __metadata("design:type", Number)
], BookingRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.bookingRequests),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", User_1.User)
], BookingRequest.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Property_1.Property, (property) => property.bookingRequests),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", Property_1.Property)
], BookingRequest.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'requested_start_date' }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "requestedStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'requested_end_date' }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "requestedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], BookingRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BookingRequest.prototype, "createdAt", void 0);
exports.BookingRequest = BookingRequest = __decorate([
    (0, typeorm_1.Entity)()
], BookingRequest);
