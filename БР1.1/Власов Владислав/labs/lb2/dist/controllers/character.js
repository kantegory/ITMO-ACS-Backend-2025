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
exports.CharacterController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const createCharacterDto_1 = require("../dtos/createCharacterDto");
const CharacterService_1 = require("../services/CharacterService");
const updateCharacterDto_1 = require("../dtos/updateCharacterDto");
const changeItemStatusDto_1 = require("../dtos/changeItemStatusDto");
const Effect_1 = require("../models/Effect");
let CharacterController = class CharacterController {
    constructor() {
        this._service = new CharacterService_1.CharacterService();
    }
    createCharacter(request, character) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!character.playerId) {
                character.playerId = request.userId;
            }
            return yield this._service.createCharacter(character);
        });
    }
    getMyCharacters(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getMyCharacters(request.userId);
        });
    }
    getOtherCharacter(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getOtherCharacters(request.userId);
        });
    }
    getCharacter(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getCharacter(request.userId, id);
        });
    }
    updateCharacter(request, id, character) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.updateCharacter(request.userId, id, character);
        });
    }
    deleteCharacter(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteCharacter(request.userId, id);
            return { "message": "Deleted successfully" };
        });
    }
    setRaceToCharacter(request, charId, raceId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.setRace(request.userId, charId, raceId);
            return { "message": "Successfully" };
        });
    }
    setVisibilityToCharacter(request, charId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.setVisibleStatus(request.userId, charId, status);
            return { "message": "Successfully" };
        });
    }
    giveItems(request, charId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveItems(request.userId, charId, items);
            return { "message": "Successfully" };
        });
    }
    changeItemStatus(request, charId, itemId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.changeItemStatus(request.userId, charId, itemId, status.status);
            return { "message": "Successfully" };
        });
    }
    deleteItems(request, items) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteItems(request.userId, items);
            return { "message": "Successfully" };
        });
    }
    giveEffects(request, charId, effects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveEffects(request.userId, charId, effects);
            return { "message": "Successfully" };
        });
    }
    deleteEffects(request, effects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteEffects(request.userId, effects);
            return { "message": "Successfully" };
        });
    }
    giveSkills(request, charId, skills) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveSkills(request.userId, charId, skills);
            return { "message": "Successfully" };
        });
    }
    setSkillLevel(request, skillId, level) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.upSkill(request.userId, skillId, level);
            return { "message": "Successfully" };
        });
    }
    deleteSkills(request, skills) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteSkills(request.userId, skills);
            return { "message": "Successfully" };
        });
    }
    giveEdges(request, charId, edges) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveEdges(request.userId, charId, edges);
            return { "message": "Successfully" };
        });
    }
    deleteEdges(request, charId, edges) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteEdges(request.userId, charId, edges);
            return { "message": "Successfully" };
        });
    }
    getAttackEffect(request, charId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getCharEffects(request.userId, charId, Effect_1.EffectType.Attact);
        });
    }
    getPassiveEffect(request, charId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getCharEffects(request.userId, charId, Effect_1.EffectType.Defence);
        });
    }
    getUniversalEffect(request, charId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.getCharEffects(request.userId, charId, Effect_1.EffectType.Universal);
        });
    }
};
exports.CharacterController = CharacterController;
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/create"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createCharacterDto_1.CreateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "createCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getMyCharacters", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/other"),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getOtherCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/update/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updateCharacterDto_1.UpdateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "updateCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/delete/:id"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "deleteCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/:charId/race/:raceId"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Param)('raceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "setRaceToCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/:charId/visibility/:status"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Boolean]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "setVisibilityToCharacter", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/:charId/items"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "giveItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/:charId/items/:itemId/status"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Param)('itemId')),
    __param(3, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, changeItemStatusDto_1.ChangeItemStatusDto]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "changeItemStatus", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/items/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "deleteItems", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/:charId/effects"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "giveEffects", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/effects/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "deleteEffects", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/:charId/skills"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "giveSkills", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/skills/:skillId/level/:level"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('skillId')),
    __param(2, (0, routing_controllers_1.Param)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "setSkillLevel", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/skills/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "deleteSkills", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/:charId/edges"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "giveEdges", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/:charId/edges/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "deleteEdges", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:charId/effects/attack"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getAttackEffect", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:charId/effects/defence"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getPassiveEffect", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:charId/effects/uni"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('charId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "getUniversalEffect", null);
exports.CharacterController = CharacterController = __decorate([
    (0, routing_controllers_1.Controller)('/characters'),
    __metadata("design:paramtypes", [])
], CharacterController);
