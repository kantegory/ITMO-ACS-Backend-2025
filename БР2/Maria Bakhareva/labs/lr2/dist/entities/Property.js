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
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Favorite_1 = require("./Favorite");
const BookingRequest_1 = require("./BookingRequest");
const PropertyImage_1 = require("./PropertyImage");
const Rental_1 = require("./Rental");
const Complaint_1 = require("./Complaint");
let Property = class Property {
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'property_id' }),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.properties),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", User_1.User)
], Property.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_type' }),
    __metadata("design:type", String)
], Property.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Property.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Favorite_1.Favorite, (fav) => fav.property),
    __metadata("design:type", Array)
], Property.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookingRequest_1.BookingRequest, (br) => br.property),
    __metadata("design:type", Array)
], Property.prototype, "bookingRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PropertyImage_1.PropertyImage, (img) => img.property),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rental_1.Rental, (rental) => rental.property),
    __metadata("design:type", Array)
], Property.prototype, "rentals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Complaint_1.Complaint, (comp) => comp.property),
    __metadata("design:type", Array)
], Property.prototype, "complaints", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)()
], Property);
