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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoles = void 0;
const database_1 = require("../config/database");
const Role_1 = require("../models/Role");
const initializeRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roleRepository = database_1.AppDataSource.getRepository(Role_1.Role);
    const existingRoles = yield roleRepository.find();
    const requiredRoles = ['user', 'admin'];
    const missingRoles = requiredRoles.filter(name => !existingRoles.some(role => role.name === name));
    if (missingRoles.length > 0) {
        const newRoles = missingRoles.map(name => {
            const role = new Role_1.Role();
            role.name = name;
            return role;
        });
        yield roleRepository.save(newRoles);
        console.log(`Initialized roles: ${missingRoles.join(', ')}`);
    }
    else {
        console.log('Roles already initialized.');
    }
});
exports.initializeRoles = initializeRoles;
