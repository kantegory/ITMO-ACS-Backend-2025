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
exports.deleteEducation = exports.updateEducation = exports.getEducationById = exports.getEducations = exports.createEducation = void 0;
const education_1 = require("../entity/education");
const createEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeId, institution, degree, startDate, endDate } = req.body;
        const edu = new education_1.Education();
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
        const edus = yield education_1.Education.find({ relations: ["resume"] });
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
        const edu = yield education_1.Education.findOne({ where: { id }, relations: ["resume"] });
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
        const edu = yield education_1.Education.findOne({ where: { id } });
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
        const edu = yield education_1.Education.findOne({ where: { id } });
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
