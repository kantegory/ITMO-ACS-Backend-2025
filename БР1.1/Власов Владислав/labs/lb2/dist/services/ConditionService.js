"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionService = void 0;
require("reflect-metadata");
const BaseCrudService_1 = __importDefault(require("./BaseCrudService"));
const Condition_1 = require("../models/Condition");
class ConditionService extends BaseCrudService_1.default {
    constructor() {
        super(Condition_1.Condition);
    }
}
exports.ConditionService = ConditionService;
