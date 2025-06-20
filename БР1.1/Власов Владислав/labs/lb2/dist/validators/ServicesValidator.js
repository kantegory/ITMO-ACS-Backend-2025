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
exports.ServicesValidator = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../config/data-source"));
const Item_1 = require("../models/Item");
const Effect_1 = require("../models/Effect");
const Edge_1 = require("../models/Edge");
const Race_1 = require("../models/Race");
const Skill_1 = require("../models/Skill");
class ServicesValidator {
    constructor() {
        this._itemRepository = data_source_1.default.getRepository(Item_1.Item);
        this._effectRepository = data_source_1.default.getRepository(Effect_1.Effect);
        this._edgeRepository = data_source_1.default.getRepository(Edge_1.Edge);
        this._raceRepository = data_source_1.default.getRepository(Race_1.Race);
        this._skillRepository = data_source_1.default.getRepository(Skill_1.Skill);
    }
    checkPassword(userPassword, password) {
        if (!bcrypt_1.default.compareSync(password, userPassword)) {
            throw new routing_controllers_1.HttpError(401, "Password or email is incorrect");
        }
    }
    isItemExist(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const idsExist = yield this._itemRepository.find({
                where: { id: (0, typeorm_1.In)(ids) },
                select: ["id"]
            });
            const idsExistArr = idsExist.map(entity => entity.id);
            const allIdsExist = ids.every(id => idsExistArr.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных предметов не существуют");
            }
        });
    }
    isEffectExist(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const idsExist = yield this._effectRepository.find({
                where: { id: (0, typeorm_1.In)(ids) },
                select: ["id"]
            });
            const idsExistArr = idsExist.map(entity => entity.id);
            const allIdsExist = ids.every(id => idsExistArr.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных эффектов не существуют");
            }
        });
    }
    isEdgeExist(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const idsExist = yield this._edgeRepository.find({
                where: { id: (0, typeorm_1.In)(ids) },
                select: ["id"]
            });
            const idsExistArr = idsExist.map(entity => entity.id);
            const allIdsExist = ids.every(id => idsExistArr.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных черт не существуют");
            }
        });
    }
    isSkillExist(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const idsExist = yield this._skillRepository.find({
                where: { id: (0, typeorm_1.In)(ids) },
                select: ["id"]
            });
            const idsExistArr = idsExist.map(entity => entity.id);
            const allIdsExist = ids.every(id => idsExistArr.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных черт не существуют");
            }
        });
    }
    isEffectOfItem(itemId, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this._itemRepository.findOne({
                where: {
                    id: itemId
                },
                relations: {
                    effects: true
                }
            });
            const idsOfItem = item.effects.map(effect => effect.id);
            const allIdsExist = ids.every(id => idsOfItem.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных эффектов не принадлежат предмету");
            }
        });
    }
    isEffectOfEdge(edgeId, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const edge = yield this._edgeRepository.findOne({
                where: {
                    id: edgeId
                },
                relations: {
                    effects: true
                }
            });
            const idsOfEdge = edge.effects.map(effect => effect.id);
            const allIdsExist = ids.every(id => idsOfEdge.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных эффектов не принадлежат черте");
            }
        });
    }
    isEdgeOfRace(raceId, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const race = yield this._raceRepository.findOne({
                where: {
                    id: raceId
                },
                relations: {
                    edges: true
                }
            });
            const idsOfEdge = race.edges.map(edge => edge.id);
            const allIdsExist = ids.every(id => idsOfEdge.includes(id));
            if (!allIdsExist) {
                throw new routing_controllers_1.HttpError(400, "Один или несколько переданных эффектов не принадлежат черте");
            }
        });
    }
    isCharacterAvalible(ownerId, char) {
        if (ownerId != char.playerId && !char.isVisible) {
            throw new routing_controllers_1.HttpError(403, "Запрошено изменение чужого персонажа");
        }
    }
}
exports.ServicesValidator = ServicesValidator;
