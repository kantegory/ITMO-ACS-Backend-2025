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
exports.RaceController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const createRaceDto_1 = require("../dtos/createRaceDto");
const RaceService_1 = require("../services/RaceService");
const changeEffectsDto_1 = require("../dtos/changeEffectsDto");
let RaceController = class RaceController {
    constructor() {
        this._service = new RaceService_1.RaceService();
    }
    createRace(race) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.post(race);
        });
    }
    getAllRaces(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request.userId);
            return yield this._service.getAll();
        });
    }
    getRaces(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.get(id);
        });
    }
    updateRaces(id, race) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._service.patch(id, race);
        });
    }
    deleteRaces(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.delete(id);
            return { "message": "Deleted successfully" };
        });
    }
    giveEdges(edges) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.giveEdges(edges.entityId, edges.effectsId);
            return { "message": "Added successfully" };
        });
    }
    deleteEdgets(edges) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteEdges(edges.entityId, edges.effectsId);
            return { "message": "Deleted successfully" };
        });
    }
};
exports.RaceController = RaceController;
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/create"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRaceDto_1.CreateRaceDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "createRace", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "getAllRaces", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "getRaces", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Patch)("/update/:id"),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createRaceDto_1.CreateRaceDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "updateRaces", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Delete)("/delete/:id"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "deleteRaces", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/edges/give"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeEffectsDto_1.ChangeEffectsDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "giveEdges", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(auth_1.default),
    (0, routing_controllers_1.Post)("/edges/delete"),
    (0, routing_controllers_1.HttpCode)(204),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeEffectsDto_1.ChangeEffectsDto]),
    __metadata("design:returntype", Promise)
], RaceController.prototype, "deleteEdgets", null);
exports.RaceController = RaceController = __decorate([
    (0, routing_controllers_1.Controller)('/races'),
    __metadata("design:paramtypes", [])
], RaceController);
