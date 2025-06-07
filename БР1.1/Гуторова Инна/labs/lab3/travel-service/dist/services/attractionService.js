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
exports.AttractionService = void 0;
const database_1 = require("../config/database");
const Attraction_1 = __importDefault(require("../entities/Attraction"));
const Route_1 = __importDefault(require("../entities/Route"));
class AttractionService {
    static create(attractionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = yield database_1.AppDataSource.getRepository(Route_1.default).findOneBy({
                route_id: attractionData.routeId
            });
            if (!route) {
                throw new Error("Route not found");
            }
            const attraction = new Attraction_1.default();
            attraction.name = attractionData.name;
            attraction.description = attractionData.description;
            attraction.location = attractionData.location;
            attraction.route = route;
            return yield this.attractionRepository.save(attraction);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attractionRepository.find({
                relations: ['route', 'media']
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.attractionRepository.findOne({
                where: { attraction_id: id },
                relations: ['route', 'media']
            });
        });
    }
    static update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const attraction = yield this.findById(id);
            if (!attraction) {
                throw new Error("Attraction not found");
            }
            if (updateData.routeId) {
                const route = yield database_1.AppDataSource.getRepository(Route_1.default).findOneBy({
                    route_id: updateData.routeId
                });
                if (!route) {
                    throw new Error("Route not found");
                }
                attraction.route = route;
                delete updateData.routeId;
            }
            Object.assign(attraction, updateData);
            return yield this.attractionRepository.save(attraction);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.attractionRepository.delete({
                attraction_id: id
            });
            if (result.affected === 0) {
                throw new Error("Attraction not found");
            }
        });
    }
}
exports.AttractionService = AttractionService;
AttractionService.attractionRepository = database_1.AppDataSource.getRepository(Attraction_1.default);
