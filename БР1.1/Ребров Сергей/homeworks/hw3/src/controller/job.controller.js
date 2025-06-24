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
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const job_1 = require("../entity/job");
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, description, requirements, salaryMin, salaryMax, experience, location } = req.body;
        const job = new job_1.Job();
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
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createJob = createJob;
const getJobs = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield job_1.Job.find({ relations: ["user", "applications"] });
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const job = yield job_1.Job.findOne({ where: { id }, relations: ["user", "applications"] });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const job = yield job_1.Job.findOne({ where: { id } });
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
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const job = yield job_1.Job.findOne({ where: { id } });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        yield job.remove();
        res.status(204).json({ message: "Job deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteJob = deleteJob;
