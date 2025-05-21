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
exports.router = exports.deleteEducation = exports.updateEducation = exports.getEducationById = exports.getEducations = exports.createEducation = exports.Education = void 0;
const typeorm_1 = require("typeorm");
const resume_1 = require("./resume");
const express_1 = require("express");
let Education = class Education extends typeorm_1.BaseEntity {
};
exports.Education = Education;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "education_id" }),
    __metadata("design:type", Number)
], Education.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_1.Resume, (resume) => resume.educations),
    (0, typeorm_1.JoinColumn)({ name: "resume_id" }),
    __metadata("design:type", resume_1.Resume)
], Education.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Education.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Education.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "start_date" }),
    __metadata("design:type", Date)
], Education.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "end_date", nullable: true }),
    __metadata("design:type", Object)
], Education.prototype, "endDate", void 0);
exports.Education = Education = __decorate([
    (0, typeorm_1.Entity)({ name: "Education" })
], Education);
const createEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeId, institution, degree, startDate, endDate } = req.body;
        const edu = new Education();
        edu.resume = { id: resumeId };
        edu.institution = institution;
        edu.degree = degree;
        edu.startDate = new Date(startDate);
        edu.endDate = endDate ? new Date(endDate) : null;
        yield edu.save();
        res.status(201).json(edu);
    }
    catch (error) {
        next(error);
    }
});
exports.createEducation = createEducation;
const getEducations = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const edus = yield Education.find({ relations: ["resume"] });
        res.json(edus);
    }
    catch (error) {
        next(error);
    }
});
exports.getEducations = getEducations;
const getEducationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const edu = yield Education.findOne({ where: { id }, relations: ["resume"] });
        if (!edu) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json(edu);
    }
    catch (error) {
        next(error);
    }
});
exports.getEducationById = getEducationById;
const updateEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const edu = yield Education.findOne({ where: { id } });
        if (!edu) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        const { institution, degree, startDate, endDate } = req.body;
        edu.institution = institution;
        edu.degree = degree;
        edu.startDate = new Date(startDate);
        edu.endDate = endDate ? new Date(endDate) : null;
        yield edu.save();
        res.json(edu);
    }
    catch (error) {
        next(error);
    }
});
exports.updateEducation = updateEducation;
const deleteEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const edu = yield Education.findOne({ where: { id } });
        if (!edu) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        yield edu.remove();
        res.json({ message: "Education deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEducation = deleteEducation;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/educations", exports.createEducation);
router.get("/educations", exports.getEducations);
router.get("/educations/:id", exports.getEducationById);
router.put("/educations/:id", exports.updateEducation);
router.delete("/educations/:id", exports.deleteEducation);
