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
exports.deleteApplication = exports.updateApplication = exports.getApplicationById = exports.getApplications = exports.createApplication = void 0;
const application_1 = require("../entity/application");
const createApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, jobId, coverLetter, status } = req.body;
        const app = new application_1.Application();
        app.user = { id: userId };
        app.job = { id: jobId };
        app.coverLetter = coverLetter;
        app.status = status;
        yield app.save();
        res.status(201).json(app);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createApplication = createApplication;
const getApplications = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apps = yield application_1.Application.find({ relations: ["user", "job"] });
        res.status(200).json(apps);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const app = yield application_1.Application.findOne({ where: { id }, relations: ["user", "job"] });
        if (!app) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json(app);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getApplicationById = getApplicationById;
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const app = yield application_1.Application.findOne({ where: { id } });
        if (!app) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        app.coverLetter = req.body.coverLetter;
        app.status = req.body.status;
        yield app.save();
        res.status(200).json(app);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateApplication = updateApplication;
const deleteApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const app = yield application_1.Application.findOne({ where: { id } });
        if (!app) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        ;
        yield app.remove();
        res.status(204).json({ message: "Application deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteApplication = deleteApplication;
