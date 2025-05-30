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
exports.router = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumes = exports.createResume = exports.Resume = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const education_1 = require("./education");
const experience_1 = require("./experience");
const express_1 = require("express");
let Resume = class Resume extends typeorm_1.BaseEntity {
};
exports.Resume = Resume;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "resume_id" }),
    __metadata("design:type", Number)
], Resume.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.resumes),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_1.User)
], Resume.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Resume.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "contact_info" }),
    __metadata("design:type", String)
], Resume.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Resume.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Resume.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_1.Experience, (exp) => exp.resume),
    __metadata("design:type", Array)
], Resume.prototype, "experiences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => education_1.Education, (edu) => edu.resume),
    __metadata("design:type", Array)
], Resume.prototype, "educations", void 0);
exports.Resume = Resume = __decorate([
    (0, typeorm_1.Entity)({ name: "Resume" })
], Resume);
const createResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, skills, contactInfo } = req.body;
        const resume = new Resume();
        resume.user = { id: userId };
        resume.title = title;
        resume.skills = skills;
        resume.contactInfo = contactInfo;
        yield resume.save();
        res.status(201).json(resume);
    }
    catch (error) {
        next(error);
    }
});
exports.createResume = createResume;
const getResumes = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumes = yield Resume.find({ relations: ["user", "experiences", "educations"] });
        res.json(resumes);
    }
    catch (error) {
        next(error);
    }
});
exports.getResumes = getResumes;
const getResumeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const resume = yield Resume.findOne({ where: { id }, relations: ["user", "experiences", "educations"] });
        if (!resume) {
            res.status(404).json({ message: "Resume not found" });
            return;
        }
        res.json(resume);
    }
    catch (error) {
        next(error);
    }
});
exports.getResumeById = getResumeById;
const updateResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const resume = yield Resume.findOne({ where: { id } });
        if (!resume) {
            res.status(404).json({ message: "Resume not found" });
            return;
        }
        ;
        const { title, skills, contactInfo } = req.body;
        resume.title = title;
        resume.skills = skills;
        resume.contactInfo = contactInfo;
        yield resume.save();
        res.json(resume);
    }
    catch (error) {
        next(error);
    }
});
exports.updateResume = updateResume;
const deleteResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const resume = yield Resume.findOne({ where: { id } });
        if (!resume) {
            res.status(404).json({ message: "Resume not found" });
            return;
        }
        yield resume.remove();
        res.json({ message: "Resume deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteResume = deleteResume;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/resumes", exports.createResume);
router.get("/resumes", exports.getResumes);
router.get("/resumes/:id", exports.getResumeById);
router.put("/resumes/:id", exports.updateResume);
router.delete("/resumes/:id", exports.deleteResume);
