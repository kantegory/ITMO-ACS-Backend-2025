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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const TravelType_1 = __importDefault(require("./TravelType"));
const Attraction_1 = __importDefault(require("./Attraction"));
const Media_1 = __importDefault(require("./Media"));
const Trip_1 = __importDefault(require("./Trip"));
let Route = class Route {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "route_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Route.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Route.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Route.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Route.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TravelType_1.default, travelType => travelType.routes),
    __metadata("design:type", TravelType_1.default)
], Route.prototype, "travel_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Trip_1.default, trip => trip.route),
    __metadata("design:type", Array)
], Route.prototype, "trips", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Attraction_1.default, attraction => attraction.route),
    __metadata("design:type", Array)
], Route.prototype, "attractions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Media_1.default, media => media.route),
    __metadata("design:type", Array)
], Route.prototype, "media", void 0);
Route = __decorate([
    (0, typeorm_1.Entity)()
], Route);
exports.default = Route;
