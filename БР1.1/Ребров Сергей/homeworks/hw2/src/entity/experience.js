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
exports.router = exports.deleteExperience = exports.updateExperience = exports.getExperienceById = exports.getExperiences = exports.createExperience = exports.Experience = void 0;
const typeorm_1 = require("typeorm");
const resume_1 = require("./resume");
const express_1 = require("express");
let Experience = class Experience extends typeorm_1.BaseEntity {
};
exports.Experience = Experience;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "experience_id" }),
    __metadata("design:type", Number)
], Experience.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_1.Resume, (resume) => resume.experiences),
    (0, typeorm_1.JoinColumn)({ name: "resume_id" }),
    __metadata("design:type", resume_1.Resume)
], Experience.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Experience.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Experience.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Experience.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "start_date" }),
    __metadata("design:type", Date)
], Experience.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "end_date", nullable: true }),
    __metadata("design:type", Object)
], Experience.prototype, "endDate", void 0);
exports.Experience = Experience = __decorate([
    (0, typeorm_1.Entity)({ name: "Experience" })
], Experience);
const createExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeId, title, description, company, startDate, endDate } = req.body;
        const exp = new Experience();
        exp.resume = { id: resumeId };
        exp.title = title;
        exp.description = description;
        exp.company = company;
        exp.startDate = new Date(startDate);
        exp.endDate = endDate ? new Date(endDate) : null;
        yield exp.save();
        res.status(201).json(exp);
    }
    catch (error) {
        next(error);
    }
});
exports.createExperience = createExperience;
const getExperiences = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exps = yield Experience.find({ relations: ["resume"] });
        res.json(exps);
    }
    catch (error) {
        next(error);
    }
});
exports.getExperiences = getExperiences;
const getExperienceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield Experience.findOne({ where: { id }, relations: ["resume"] });
        if (!exp) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json(exp);
    }
    catch (error) {
        next(error);
    }
});
exports.getExperienceById = getExperienceById;
const updateExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield Experience.findOne({ where: { id } });
        if (!exp) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        const { title, description, company, startDate, endDate } = req.body;
        exp.title = title;
        exp.description = description;
        exp.company = company;
        exp.startDate = new Date(startDate);
        exp.endDate = endDate ? new Date(endDate) : null;
        yield exp.save();
        res.json(exp);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExperience = updateExperience;
const deleteExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield Experience.findOne({ where: { id } });
        if (!exp) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        yield exp.remove();
        res.json({ message: "Experience deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExperience = deleteExperience;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/experiences", exports.createExperience);
router.get("/experiences", exports.getExperiences);
router.get("/experiences/:id", exports.getExperienceById);
router.put("/experiences/:id", exports.updateExperience);
router.delete("/experiences/:id", exports.deleteExperience);
