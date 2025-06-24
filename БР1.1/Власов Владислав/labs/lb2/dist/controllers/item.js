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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const createItemDto_1 = require("../dtos/createItemDto");
const ItemService_1 = require("../services/ItemService");
const changeEffectsDto_1 = require("../dtos/changeEffectsDto");
let ItemController = class ItemController {
    constructor() {
        this._service = new ItemService_1.ItemService();
    }
    createItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.post(item);
        });
    }
    getAllItems(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request.userId);
            return yield this._service.getAll();
        });
    }
    getItems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.get(id);
        });
    }
    updateItems(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.patch(id, item);
        });
    }
    deleteItems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.delete(id);
            return { "message": "Deleted successfully" };
        });
    }
    giveEffects(effects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveEffects(effects.entityId, effects.effectsId);
            return { "message": "Added successfully" };
        });
    }
    deleteEffects(effects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteEffects(effects.entityId, effects.effectsId);
            return { "message": "Deleted successfully" };
        });
    }
};
exports.ItemController = ItemController;
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/create"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createItemDto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createItem", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getAllItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "getItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/update/:id"),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createItemDto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/delete/:id"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "deleteItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/effects/give"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeEffectsDto_1.ChangeEffectsDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "giveEffects", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/effects/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeEffectsDto_1.ChangeEffectsDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "deleteEffects", null);
exports.ItemController = ItemController = __decorate([
    (0, routing_controllers_1.Controller)('/items'),
    __metadata("design:paramtypes", [])
], ItemController);
