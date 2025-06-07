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
exports.AttractionController = void 0;
const attractionService_1 = require("../services/attractionService");
class AttractionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attraction = yield attractionService_1.AttractionService.create(req.body);
                res.status(201).json(attraction);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create attraction';
                res.status(400).json({ message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attractions = yield attractionService_1.AttractionService.findAll();
                res.json(attractions);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get attractions';
                res.status(500).json({ message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attraction = yield attractionService_1.AttractionService.findById(Number(req.params.id));
                if (!attraction) {
                    return res.status(404).json({ message: 'Attraction not found' });
                }
                res.json(attraction);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get attraction';
                res.status(500).json({ message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attraction = yield attractionService_1.AttractionService.update(Number(req.params.id), req.body);
                res.json(attraction);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update attraction';
                res.status(400).json({ message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield attractionService_1.AttractionService.delete(Number(req.params.id));
                res.json({ message: 'Attraction deleted successfully' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete attraction';
                res.status(400).json({ message });
            }
        });
    }
}
exports.AttractionController = AttractionController;
