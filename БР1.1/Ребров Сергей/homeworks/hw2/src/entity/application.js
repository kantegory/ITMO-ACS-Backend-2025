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
exports.router = exports.deleteApplication = exports.updateApplication = exports.getApplicationById = exports.getApplications = exports.createApplication = exports.Application = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const job_1 = require("./job");
const express_1 = require("express");
let Application = class Application extends typeorm_1.BaseEntity {
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "application_id" }),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.applications),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_1.User)
], Application.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_1.Job, (job) => job.applications),
    (0, typeorm_1.JoinColumn)({ name: "job_id" }),
    __metadata("design:type", job_1.Job)
], Application.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "cover_letter" }),
    __metadata("design:type", String)
], Application.prototype, "coverLetter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)({ name: "Application" })
], Application);
const createApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, jobId, coverLetter, status } = req.body;
        const app = new Application();
        app.user = { id: userId };
        app.job = { id: jobId };
        app.coverLetter = coverLetter;
        app.status = status;
        yield app.save();
        res.status(201).json(app);
    }
    catch (error) {
        next(error);
    }
});
exports.createApplication = createApplication;
const getApplications = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apps = yield Application.find({ relations: ["user", "job"] });
        res.json(apps);
    }
    catch (error) {
        next(error);
    }
});
exports.getApplications = getApplications;
const getApplicationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const app = yield Application.findOne({ where: { id }, relations: ["user", "job"] });
        if (!app) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.json(app);
    }
    catch (error) {
        next(error);
    }
});
exports.getApplicationById = getApplicationById;
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const app = yield Application.findOne({ where: { id } });
        if (!app) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        app.coverLetter = req.body.coverLetter;
        app.status = req.body.status;
        yield app.save();
        res.json(app);
    }
    catch (error) {
        next(error);
    }
});
exports.updateApplication = updateApplication;
const deleteApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const app = yield Application.findOne({ where: { id } });
        if (!app) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        ;
        yield app.remove();
        res.json({ message: "Application deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteApplication = deleteApplication;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/applications", exports.createApplication);
router.get("/applications", exports.getApplications);
router.get("/applications/:id", exports.getApplicationById);
router.put("/applications/:id", exports.updateApplication);
router.delete("/applications/:id", exports.deleteApplication);
