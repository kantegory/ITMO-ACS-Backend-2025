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
exports.router = exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = exports.Job = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const application_1 = require("./application");
const express_1 = require("express");
let Job = class Job extends typeorm_1.BaseEntity {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "job_id" }),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.jobs),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_1.User)
], Job.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Job.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "salary_min" }),
    __metadata("design:type", Number)
], Job.prototype, "salaryMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "salary_max" }),
    __metadata("design:type", Number)
], Job.prototype, "salaryMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Job.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_1.Application, (app) => app.job),
    __metadata("design:type", Array)
], Job.prototype, "applications", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)({ name: "Job" })
], Job);
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;
        const job = new Job();
        job.user = { id: userId };
        job.title = title;
        job.description = description;
        job.requirements = requirements;
        job.salaryMin = salaryMin;
        job.salaryMax = salaryMax;
        job.experience = experience;
        job.location = location;
        yield job.save();
        res.status(201).json(job);
    }
    catch (error) {
        next(error);
    }
});
exports.createJob = createJob;
const getJobs = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job.find({ relations: ["user", "applications"] });
        res.json(jobs);
    }
    catch (error) {
        next(error);
    }
});
exports.getJobs = getJobs;
const getJobById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const job = yield Job.findOne({ where: { id }, relations: ["user", "applications"] });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        res.json(job);
    }
    catch (error) {
        next(error);
    }
});
exports.getJobById = getJobById;
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const job = yield Job.findOne({ where: { id } });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        const { title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;
        job.title = title;
        job.description = description;
        job.requirements = requirements;
        job.salaryMin = salaryMin;
        job.salaryMax = salaryMax;
        job.experience = experience;
        job.location = location;
        yield job.save();
        res.json(job);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const job = yield Job.findOne({ where: { id } });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        yield job.remove();
        res.json({ message: "Job deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJob = deleteJob;
const router = (0, express_1.Router)();
exports.router = router;
router.post("/jobs", exports.createJob);
router.get("/jobs", exports.getJobs);
router.get("/jobs/:id", exports.getJobById);
router.put("/jobs/:id", exports.updateJob);
router.delete("/jobs/:id", exports.deleteJob);
