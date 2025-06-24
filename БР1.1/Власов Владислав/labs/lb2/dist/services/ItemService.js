"use strict";
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
exports.ItemService = void 0;
require("reflect-metadata");
const data_source_1 = __importDefault(require("../config/data-source"));
const BaseCrudService_1 = __importDefault(require("./BaseCrudService"));
const Item_1 = require("../models/Item");
const ServicesValidator_1 = require("../validators/ServicesValidator");
const routing_controllers_1 = require("routing-controllers");
const Effect_1 = require("../models/Effect");
class ItemService extends BaseCrudService_1.default {
    constructor() {
        super(Item_1.Item);
        this._validator = new ServicesValidator_1.ServicesValidator();
        this._effectRepository = data_source_1.default.getRepository(Effect_1.Effect);
    }
    giveEffects(id, effectsId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validator.isEffectExist(effectsId);
            const item = yield this._repository.findOne({
                where: { id },
                relations: ['effects'],
            });
            if (!item) {
                throw new routing_controllers_1.HttpError(404, 'Item not found!');
            }
            for (const effectId of effectsId) {
                const effect = yield this._effectRepository.findOneBy({ id: effectId });
                item.effects.push(effect);
            }
            yield this._repository.save(item);
        });
    }
    deleteEffects(id, effectsId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validator.isEffectOfItem(id, effectsId);
            const item = yield this._repository.findOne({
                where: {
                    id: id
                },
                relations: {
                    effects: true
                }
            });
            if (!item) {
                throw new routing_controllers_1.HttpError(404, 'Item not found!');
            }
            item.effects = item.effects.filter((effect) => {
                return !effectsId.includes(effect.id);
            });
            console.log(item);
            yield this._repository.save(item);
        });
    }
}
exports.ItemService = ItemService;
