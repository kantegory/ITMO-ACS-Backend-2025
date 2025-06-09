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
exports.TripController = void 0;
const tripService_1 = require("../services/tripService");
class TripController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trip = yield tripService_1.TripService.create(req.body);
                res.status(201).json(trip);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create trip';
                res.status(400).json({ message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trips = yield tripService_1.TripService.findAll();
                res.json(trips);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get trips';
                res.status(500).json({ message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trip = yield tripService_1.TripService.findById(Number(req.params.id));
                trip
                    ? res.json(trip)
                    : res.status(404).json({ message: 'Trip not found' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get trip';
                res.status(500).json({ message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trip = yield tripService_1.TripService.update(Number(req.params.id), req.body);
                res.json(trip);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update trip';
                res.status(400).json({ message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tripService_1.TripService.delete(Number(req.params.id));
                res.json({ message: 'Trip deleted successfully' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete trip';
                res.status(400).json({ message });
            }
        });
    }
}
exports.TripController = TripController;
