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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Rental_1 = require("./Rental");
const Chat_1 = require("./Chat");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'message_id' }),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.sentMessages),
    (0, typeorm_1.JoinColumn)({ name: 'sender_id' }),
    __metadata("design:type", User_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.receivedMessages),
    (0, typeorm_1.JoinColumn)({ name: 'receiver_id' }),
    __metadata("design:type", User_1.User)
], Message.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rental_1.Rental, (rental) => rental.messages),
    (0, typeorm_1.JoinColumn)({ name: 'rental_id' }),
    __metadata("design:type", Rental_1.Rental)
], Message.prototype, "rental", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat_1.Chat, (chat) => chat.messages),
    (0, typeorm_1.JoinColumn)({ name: 'chat_id' }),
    __metadata("design:type", Chat_1.Chat)
], Message.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
