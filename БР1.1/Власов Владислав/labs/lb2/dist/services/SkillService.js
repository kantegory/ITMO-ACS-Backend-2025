"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
require("reflect-metadata");
const BaseCrudService_1 = __importDefault(require("./BaseCrudService"));
const Skill_1 = require("../models/Skill");
class SkillService extends BaseCrudService_1.default {
    constructor() {
        super(Skill_1.Skill);
    }
}
exports.SkillService = SkillService;
