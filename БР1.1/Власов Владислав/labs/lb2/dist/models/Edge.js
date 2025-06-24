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
exports.Edge = exports.EdgeArea = exports.EdgeType = void 0;
const typeorm_1 = require("typeorm");
const Effect_1 = require("./Effect");
var EdgeType;
(function (EdgeType) {
    EdgeType["Edge"] = "edge";
    EdgeType["Hindrances"] = "hindrances";
    EdgeType["RaceEdge"] = "raceEdge";
    EdgeType["RaceHindrances"] = "raceHindrances";
})(EdgeType || (exports.EdgeType = EdgeType = {}));
var EdgeArea;
(function (EdgeArea) {
    EdgeArea["Attact"] = "attack";
    EdgeArea["Defence"] = "defence";
    EdgeArea["Universal"] = "universal";
})(EdgeArea || (exports.EdgeArea = EdgeArea = {}));
let Edge = class Edge {
};
exports.Edge = Edge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Edge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Edge.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], Edge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EdgeType,
    }),
    __metadata("design:type", String)
], Edge.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Effect_1.Effect),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Edge.prototype, "effects", void 0);
exports.Edge = Edge = __decorate([
    (0, typeorm_1.Entity)()
], Edge);
