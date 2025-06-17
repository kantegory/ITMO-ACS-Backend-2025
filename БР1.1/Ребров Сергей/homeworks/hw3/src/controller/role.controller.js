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
exports.deleteRole = exports.updateRole = exports.getRoleById = exports.getRoles = exports.createRole = void 0;
const role_1 = require("../entity/role");
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Missing 'name'" });
            return;
        }
        const role = new role_1.Role();
        role.name = name;
        yield role.save();
        res.status(201).json(role);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createRole = createRole;
const getRoles = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.find();
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getRoles = getRoles;
const getRoleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const role = yield role_1.Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        res.status(200).json(role);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getRoleById = getRoleById;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;
        if (isNaN(id) || !name) {
            res.status(400).json({ message: "Invalid data" });
            return;
        }
        const role = yield role_1.Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        role.name = name;
        yield role.save();
        res.status(200).json(role);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const role = yield role_1.Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        yield role.remove();
        res.status(204).json({ message: "Role deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteRole = deleteRole;
