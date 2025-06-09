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
exports.TripService = void 0;
const database_1 = require("../config/database");
const Trip_1 = __importDefault(require("../entities/Trip"));
const Route_1 = __importDefault(require("../entities/Route"));
class TripService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = yield database_1.AppDataSource.getRepository(Route_1.default).findOneBy({
                route_id: data.route_id
            });
            if (!route)
                throw new Error("Route not found");
            const trip = new Trip_1.default();
            trip.start_date = data.start_date;
            trip.end_date = data.end_date;
            trip.available_slots = data.available_slots;
            trip.status = data.status;
            trip.route = route;
            return yield this.repo.save(trip);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ relations: ['route'] });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { trip_id: id },
                relations: ['route']
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.findById(id);
            if (!trip)
                throw new Error("Trip not found");
            if (data.route_id) {
                const route = yield database_1.AppDataSource.getRepository(Route_1.default).findOneBy({
                    route_id: data.route_id
                });
                if (!route)
                    throw new Error("Route not found");
                trip.route = route;
            }
            Object.assign(trip, data);
            return yield this.repo.save(trip);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.delete({
                trip_id: id
            });
            if (result.affected === 0)
                throw new Error("Trip not found");
        });
    }
}
exports.TripService = TripService;
TripService.repo = database_1.AppDataSource.getRepository(Trip_1.default);
