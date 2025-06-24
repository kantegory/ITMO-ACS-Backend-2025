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
exports.router = exports.getUserByIdOrEmail = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = exports.User = void 0;
const typeorm_1 = require("typeorm");
const role_1 = require("./role");
const resume_1 = require("./resume");
const job_1 = require("./job");
const application_1 = require("./application");
const express_1 = require("express");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "user_id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_1.Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resume_1.Resume, (resume) => resume.user),
    __metadata("design:type", Array)
], User.prototype, "resumes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_1.Job, (job) => job.user),
    __metadata("design:type", Array)
], User.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_1.Application, (app) => app.user),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "User" })
], User);
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, description, roleId } = req.body;
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({ relations: ["role"] });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const user = yield User.findOne({
            where: { id },
            relations: ["role"],
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const { name, email, password, description, roleId } = req.body;
        const user = yield User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.name = name;
        user.email = email;
        user.password = password;
        user.description = description;
        user.role = { id: roleId };
        yield user.save();
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" });
            return;
        }
        const user = yield User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        yield user.remove();
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getUserByIdOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = req.query;
        if (id) {
            const userId = parseInt(id, 10);
            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid id" });
                return;
            }
            const user = yield User.findOne({
                where: { id: userId },
                relations: ["role"],
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
            return;
        }
        if (email) {
            const user = yield User.findOne({
                where: { email: email },
                relations: ["role"],
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
            return;
        }
        res.status(400).json({ message: "Please provide either id or email" });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserByIdOrEmail = getUserByIdOrEmail;
const router = (0, express_1.Router)();
exports.router = router;
router.get("/users/search", exports.getUserByIdOrEmail);
router.post("/users", exports.createUser);
router.get("/users", exports.getUsers);
router.get("/users/:id", exports.getUserById);
router.put("/users/:id", exports.updateUser);
router.delete("/users/:id", exports.deleteUser);
