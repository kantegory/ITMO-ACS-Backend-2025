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
exports.RouteService = void 0;
const database_1 = require("../config/database");
const Route_1 = __importDefault(require("../entities/Route"));
const TravelType_1 = __importDefault(require("../entities/TravelType"));
class RouteService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const travelType = yield database_1.AppDataSource.getRepository(TravelType_1.default).findOneBy({
                travel_type_id: data.travel_type_id
            });
            if (!travelType)
                throw new Error("Travel type not found");
            const route = new Route_1.default();
            route.title = data.title;
            route.description = data.description;
            route.price = data.price;
            route.duration = data.duration;
            route.travel_type = travelType;
            return yield this.repo.save(route);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({
                relations: ['travel_type', 'attractions', 'trips']
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { route_id: id },
                relations: ['travel_type', 'attractions', 'trips', 'media']
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = yield this.findById(id);
            if (!route)
                throw new Error("Route not found");
            if (data.travel_type_id) {
                const travelType = yield database_1.AppDataSource.getRepository(TravelType_1.default).findOneBy({
                    travel_type_id: data.travel_type_id
                });
                if (!travelType)
                    throw new Error("Travel type not found");
                route.travel_type = travelType;
                delete data.travel_type_id;
            }
            Object.assign(route, data);
            return yield this.repo.save(route);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.delete({
                route_id: id
            });
            if (result.affected === 0)
                throw new Error("Route not found");
        });
    }
}
exports.RouteService = RouteService;
RouteService.repo = database_1.AppDataSource.getRepository(Route_1.default);
