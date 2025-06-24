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
exports.UserService = void 0;
const User_1 = require("../models/User");
require("reflect-metadata");
const data_source_1 = __importDefault(require("../config/data-source"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const routing_controllers_1 = require("routing-controllers");
class UserService {
    constructor() {
        this._repository = data_source_1.default.getRepository(User_1.User);
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.find();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.findOneBy({ id });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.findOneBy({ email });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = (0, hashPassword_1.default)(user.password);
            const createdUser = this._repository.create(user);
            const results = yield this._repository.save(createdUser);
            return results;
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this._repository.findOneBy({ id });
            if (!userDB) {
                throw new routing_controllers_1.HttpError(404, "User not found!");
            }
            if (user.password) {
                user.password = (0, hashPassword_1.default)(user.password);
            }
            Object.assign(userDB, user);
            const results = yield this._repository.save(userDB);
            return results;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this._repository.findOneBy({ id });
            if (!userDB) {
                throw new routing_controllers_1.HttpError(404, "User not found!");
            }
            yield this._repository.delete(id);
        });
    }
}
exports.UserService = UserService;
