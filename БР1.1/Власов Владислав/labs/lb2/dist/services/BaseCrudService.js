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
require("reflect-metadata");
const data_source_1 = __importDefault(require("../config/data-source"));
const routing_controllers_1 = require("routing-controllers");
class BaseCrudService {
    constructor(entity) {
        this._repository = data_source_1.default.getRepository(entity);
    }
    post(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdEntity = this._repository.create(entity);
            const results = yield this._repository.save(createdEntity);
            return results;
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._repository.find();
        });
    }
    ;
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity_db = yield this._repository.findOneBy({ id });
            if (!entity_db) {
                throw new routing_controllers_1.HttpError(404, `${this._repository.metadata.name} not found!`);
            }
            return entity_db;
        });
    }
    ;
    patch(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityForUpdate = yield this._repository.findOneBy({ id });
            if (!entityForUpdate) {
                throw new routing_controllers_1.HttpError(404, `${this._repository.metadata.name} not found!`);
            }
            Object.assign(entityForUpdate, entity);
            const results = yield this._repository.save(entityForUpdate);
            return results;
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity_db = yield this._repository.findOneBy({ id });
            if (!entity_db) {
                throw new routing_controllers_1.HttpError(404, `${this._repository.metadata.name} not found!`);
            }
            const results = yield this._repository.delete(id);
            return results;
        });
    }
    ;
}
exports.default = BaseCrudService;
