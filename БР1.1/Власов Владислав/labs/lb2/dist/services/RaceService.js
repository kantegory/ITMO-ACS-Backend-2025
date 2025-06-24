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
exports.RaceService = void 0;
require("reflect-metadata");
const data_source_1 = __importDefault(require("../config/data-source"));
const BaseCrudService_1 = __importDefault(require("./BaseCrudService"));
const Race_1 = require("../models/Race");
const ServicesValidator_1 = require("../validators/ServicesValidator");
const routing_controllers_1 = require("routing-controllers");
const Edge_1 = require("../models/Edge");
class RaceService extends BaseCrudService_1.default {
    constructor() {
        super(Race_1.Race);
        this._validator = new ServicesValidator_1.ServicesValidator();
        this._edgeRepository = data_source_1.default.getRepository(Edge_1.Edge);
    }
    giveEdges(id, edgesId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validator.isEdgeExist(edgesId);
            const race = yield this._repository.findOne({
                where: { id },
                relations: ['edges'],
            });
            if (!race) {
                throw new routing_controllers_1.HttpError(404, 'Race not found!');
            }
            for (const id of edgesId) {
                const edge = yield this._edgeRepository.findOneBy({ id });
                race.edges.push(edge);
            }
            yield this._repository.save(race);
        });
    }
    deleteEdges(id, edgesId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validator.isEdgeOfRace(id, edgesId);
            const race = yield this._repository.findOne({
                where: {
                    id: id
                },
                relations: {
                    edges: true
                }
            });
            if (!race) {
                throw new routing_controllers_1.HttpError(404, 'Race not found!');
            }
            race.edges = race.edges.filter((edge) => {
                return !edgesId.includes(edge.id);
            });
            yield this._repository.save(race);
        });
    }
}
exports.RaceService = RaceService;
