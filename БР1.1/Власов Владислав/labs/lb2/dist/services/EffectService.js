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
exports.EffectService = void 0;
require("reflect-metadata");
const Effect_1 = require("../models/Effect");
const BaseCrudService_1 = __importDefault(require("./BaseCrudService"));
const routing_controllers_1 = require("routing-controllers");
class EffectService extends BaseCrudService_1.default {
    constructor() {
        super(Effect_1.Effect);
    }
    getConditions(effectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const effect = yield this._repository.findOne({ where: { id: effectId }, relations: ["conditions"] });
            if (!effect) {
                throw new routing_controllers_1.HttpError(404, `${this._repository.metadata.name} not found!`);
            }
            return effect.conditions;
        });
    }
}
exports.EffectService = EffectService;
