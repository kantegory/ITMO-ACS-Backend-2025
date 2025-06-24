"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.router = exports.deleteRole = exports.updateRole = exports.getRoleById = exports.getRoles = exports.createRole = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const express_1 = require("express");
let Role = class Role extends typeorm_1.BaseEntity {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "role_id" }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.User, (user) => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)({ name: "Role" })
], Role);
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const role = new Role();
        role.name = name;
        yield role.save();
        res.status(201).json(role);
    }
    catch (error) {
        next(error);
    }
});
exports.createRole = createRole;
const getRoles = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role.find();
        res.json(roles);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoles = getRoles;
const getRoleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const role = yield Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        res.json(role);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoleById = getRoleById;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;
        const role = yield Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        role.name = name;
        yield role.save();
        res.json(role);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const role = yield Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        yield role.remove();
        res.json({ message: "Role deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRole = deleteRole;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/roles", exports.createRole);
router.get("/roles", exports.getRoles);
router.get("/roles/:id", exports.getRoleById);
router.put("/roles/:id", exports.updateRole);
router.delete("/roles/:id", exports.deleteRole);
