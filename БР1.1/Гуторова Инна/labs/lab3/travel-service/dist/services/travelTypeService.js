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
exports.TravelTypeService = void 0;
const database_1 = require("../config/database");
const TravelType_1 = __importDefault(require("../entities/TravelType"));
class TravelTypeService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const travelType = new TravelType_1.default();
            travelType.name = data.name;
            return yield this.repo.save(travelType);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ relations: ['routes'] });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { travel_type_id: id },
                relations: ['routes']
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const travelType = yield this.findById(id);
            if (!travelType)
                throw new Error("Travel type not found");
            Object.assign(travelType, data);
            return yield this.repo.save(travelType);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.delete({
                travel_type_id: id
            });
            if (result.affected === 0)
                throw new Error("Travel type not found");
        });
    }
}
exports.TravelTypeService = TravelTypeService;
TravelTypeService.repo = database_1.AppDataSource.getRepository(TravelType_1.default);
