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
exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumes = exports.createResume = void 0;
const resume_1 = require("../entity/resume");
const createResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, skills, contactInfo } = req.body;
        const resume = new resume_1.Resume();
        resume.user = { id: userId };
        resume.title = title;
        resume.skills = skills;
        resume.contactInfo = contactInfo;
        yield resume.save();
        res.status(201).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createResume = createResume;
const getResumes = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumes = yield resume_1.Resume.find({ relations: ["user", "experiences", "educations"] });
        res.status(200).json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const resume = yield resume_1.Resume.findOne({ where: { id }, relations: ["user", "experiences", "educations"] });
        if (!resume) {
            res.status(404).json({ message: "Resume not found" });
            return;
        }
        res.status(200).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const resume = yield resume_1.Resume.findOne({ where: { id } });
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
        res.status(200).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const resume = yield resume_1.Resume.findOne({ where: { id } });
        if (!resume) {
            res.status(404).json({ message: "Resume not found" });
            return;
        }
        yield resume.remove();
        res.status(204).json({ message: "Resume deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteResume = deleteResume;
