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
exports.deleteExperience = exports.updateExperience = exports.getExperienceById = exports.getExperiences = exports.createExperience = void 0;
const experience_1 = require("../entity/experience");
const createExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeId, title, description, company, startDate, endDate } = req.body;
        const exp = new experience_1.Experience();
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
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createExperience = createExperience;
const getExperiences = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exps = yield experience_1.Experience.find({ relations: ["resume"] });
        res.status(200).json(exps);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getExperiences = getExperiences;
const getExperienceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield experience_1.Experience.findOne({ where: { id }, relations: ["resume"] });
        if (!exp) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.status(200).json(exp);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getExperienceById = getExperienceById;
const updateExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield experience_1.Experience.findOne({ where: { id } });
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
        res.status(200).json(exp);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateExperience = updateExperience;
const deleteExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const exp = yield experience_1.Experience.findOne({ where: { id } });
        if (!exp) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        yield exp.remove();
        res.status(204).json({ message: "Experience deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteExperience = deleteExperience;
