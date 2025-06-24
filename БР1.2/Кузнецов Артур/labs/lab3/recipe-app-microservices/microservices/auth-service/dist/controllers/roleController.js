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
exports.deleteRole = exports.updateRole = exports.getRole = exports.getRoles = exports.createRole = void 0;
const database_1 = require("../config/database");
const Role_1 = require("../models/Role");
const roleRepository = database_1.AppDataSource.getRepository(Role_1.Role);
const createRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.length > 50) {
            res.status(400).json({ message: 'Invalid or missing name' });
            return;
        }
        const entity = roleRepository.create({ name });
        const saved = yield roleRepository.save(entity);
        const result = yield roleRepository
            .createQueryBuilder('role')
            .select(['role.id', 'role.name'])
            .where('role.id = :id', { id: saved.id })
            .getOne();
        res.status(201).json(result);
    });
};
exports.createRole = createRole;
const getRoles = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield roleRepository
            .createQueryBuilder('role')
            .select(['role.id', 'role.name'])
            .getMany();
        res.json(list);
    });
};
exports.getRoles = getRoles;
const getRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const item = yield roleRepository
                .createQueryBuilder('role')
                .select(['role.id', 'role.name'])
                .where('role.id = :id', { id })
                .getOne();
            if (!item) {
                res.status(404).json({ message: 'Role not found' });
                return;
            }
            res.json(item);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.getRole = getRole;
const updateRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const { name } = req.body;
        if (name && (typeof name !== 'string' || name.length > 50)) {
            res.status(400).json({ message: 'Invalid name' });
            return;
        }
        const result = yield roleRepository.update(id, { name });
        if (result.affected === 0) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.json({ message: 'Role updated successfully' });
    });
};
exports.updateRole = updateRole;
const deleteRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield roleRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(204).send();
    });
};
exports.deleteRole = deleteRole;
