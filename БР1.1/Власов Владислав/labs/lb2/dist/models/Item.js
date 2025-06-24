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
exports.Item = exports.ItemType = void 0;
const typeorm_1 = require("typeorm");
const Effect_1 = require("./Effect");
const ItemToCharacter_1 = require("./ItemToCharacter");
var ItemType;
(function (ItemType) {
    ItemType["Weapon"] = "weapon";
    ItemType["Armor"] = "armor";
    ItemType["Equipment"] = "equipment";
})(ItemType || (exports.ItemType = ItemType = {}));
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: "" }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ItemType
    }),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Item.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Item.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Effect_1.Effect),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Item.prototype, "effects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ItemToCharacter_1.ItemToCharacter, character => character.item),
    __metadata("design:type", Array)
], Item.prototype, "characters", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
