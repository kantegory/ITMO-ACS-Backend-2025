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
exports.ItemToCharacter = exports.ItemStatus = void 0;
const typeorm_1 = require("typeorm");
const Character_1 = require("./Character");
const Item_1 = require("./Item");
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["MOVING"] = "moving";
    ItemStatus["EQUIPPED"] = "equipped";
    ItemStatus["STORED"] = "stored";
})(ItemStatus || (exports.ItemStatus = ItemStatus = {}));
let ItemToCharacter = class ItemToCharacter {
};
exports.ItemToCharacter = ItemToCharacter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemToCharacter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ItemStatus,
        default: ItemStatus.MOVING
    }),
    __metadata("design:type", String)
], ItemToCharacter.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Item_1.Item),
    (0, typeorm_1.JoinColumn)({ name: 'itemId' }),
    __metadata("design:type", Item_1.Item)
], ItemToCharacter.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], ItemToCharacter.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_1.Character, (character) => character.items),
    (0, typeorm_1.JoinColumn)({ name: 'characterId' }),
    __metadata("design:type", Character_1.Character)
], ItemToCharacter.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], ItemToCharacter.prototype, "characterId", void 0);
exports.ItemToCharacter = ItemToCharacter = __decorate([
    (0, typeorm_1.Entity)()
], ItemToCharacter);
