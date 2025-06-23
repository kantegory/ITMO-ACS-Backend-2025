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
exports.Contract = exports.ContractStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Apartment_1 = require("./Apartment");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["PENDING"] = "v";
    ContractStatus["ACTIVE"] = "l";
    ContractStatus["FINISHED"] = "f";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
let Contract = class Contract {
    constructor() {
        this.ContractID = undefined;
        this.AgentID = undefined;
        this.ClientID = undefined;
        this.ApartmentID = undefined;
        this.Status = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
    }
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Contract.prototype, "ContractID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.agentContracts),
    (0, typeorm_1.JoinColumn)({ name: "AgentID" }),
    __metadata("design:type", User_1.User)
], Contract.prototype, "AgentID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.clientContracts),
    (0, typeorm_1.JoinColumn)({ name: "ClientID" }),
    __metadata("design:type", User_1.User)
], Contract.prototype, "ClientID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Apartment_1.Apartment, apartment => apartment.Contracts),
    (0, typeorm_1.JoinColumn)({ name: "ApartmentID" }),
    __metadata("design:type", Apartment_1.Apartment)
], Contract.prototype, "ApartmentID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 1,
        default: ContractStatus.PENDING,
        enum: ContractStatus
    }),
    __metadata("design:type", String)
], Contract.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Contract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Contract.prototype, "endDate", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)("contracts"),
    __metadata("design:paramtypes", [])
], Contract);
//# sourceMappingURL=Contract.js.map