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
exports.MediaService = void 0;
const database_1 = require("../config/database");
const Media_1 = __importDefault(require("../entities/Media"));
const Route_1 = __importDefault(require("../entities/Route"));
const Attraction_1 = __importDefault(require("../entities/Attraction"));
class MediaService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = new Media_1.default();
            media.url = data.url;
            media.type = data.type;
            if (data.route_id) {
                const route = yield database_1.AppDataSource.getRepository(Route_1.default).findOneBy({
                    route_id: data.route_id
                });
                if (!route)
                    throw new Error("Route not found");
                media.route = route;
            }
            if (data.attraction_id) {
                const attraction = yield database_1.AppDataSource.getRepository(Attraction_1.default).findOneBy({
                    attraction_id: data.attraction_id
                });
                if (!attraction)
                    throw new Error("Attraction not found");
                media.attraction = attraction;
            }
            return yield this.repo.save(media);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({ relations: ['route', 'attraction'] });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findOne({
                where: { media_id: id },
                relations: ['route', 'attraction']
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.delete({
                media_id: id
            });
            if (result.affected === 0)
                throw new Error("Media not found");
        });
    }
}
exports.MediaService = MediaService;
MediaService.repo = database_1.AppDataSource.getRepository(Media_1.default);
