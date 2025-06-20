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
exports.ChatHistory = void 0;
const typeorm_1 = require("typeorm");
const Message_1 = require("./Message");
const Roll_1 = require("./Roll");
let ChatHistory = class ChatHistory {
};
exports.ChatHistory = ChatHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatHistory.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['roll', 'message']
    }),
    __metadata("design:type", String)
], ChatHistory.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roll_1.Roll, { nullable: true }),
    __metadata("design:type", Roll_1.Roll)
], ChatHistory.prototype, "roll", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Message_1.Message, { nullable: true }),
    __metadata("design:type", Message_1.Message)
], ChatHistory.prototype, "message", void 0);
exports.ChatHistory = ChatHistory = __decorate([
    (0, typeorm_1.Entity)()
], ChatHistory);
