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
exports.TravelTypeController = void 0;
const travelTypeService_1 = require("../services/travelTypeService");
class TravelTypeController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelType = yield travelTypeService_1.TravelTypeService.create(req.body);
                res.status(201).json(travelType);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create travel type';
                res.status(400).json({ message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelTypes = yield travelTypeService_1.TravelTypeService.findAll();
                res.json(travelTypes);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get travel types';
                res.status(500).json({ message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelType = yield travelTypeService_1.TravelTypeService.findById(Number(req.params.id));
                travelType
                    ? res.json(travelType)
                    : res.status(404).json({ message: 'Travel type not found' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get travel type';
                res.status(500).json({ message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelType = yield travelTypeService_1.TravelTypeService.update(Number(req.params.id), req.body);
                res.json(travelType);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update travel type';
                res.status(400).json({ message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield travelTypeService_1.TravelTypeService.delete(Number(req.params.id));
                res.json({ message: 'Travel type deleted successfully' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete travel type';
                res.status(400).json({ message });
            }
        });
    }
}
exports.TravelTypeController = TravelTypeController;
