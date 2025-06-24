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
exports.AuthorizationService = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("reflect-metadata");
const data_source_1 = __importDefault(require("../config/data-source"));
const routing_controllers_1 = require("routing-controllers");
const settings_1 = __importDefault(require("../config/settings"));
const ServicesValidator_1 = require("../validators/ServicesValidator");
class AuthorizationService {
    constructor() {
        this._repository = data_source_1.default.getRepository(User_1.User);
        this._validator = new ServicesValidator_1.ServicesValidator();
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this._repository.findOneBy({ email: user.email });
            if (!userDB) {
                throw new routing_controllers_1.HttpError(401, "Password or email is incorrect");
            }
            this._validator.checkPassword(userDB.password, user.password);
            const accessToken = jsonwebtoken_1.default.sign({ id: userDB.id }, settings_1.default.JWT_SECRET_KEY, {
                expiresIn: settings_1.default.JWT_ACCESS_TOKEN_LIFETIME,
            });
            return accessToken;
        });
    }
}
exports.AuthorizationService = AuthorizationService;
