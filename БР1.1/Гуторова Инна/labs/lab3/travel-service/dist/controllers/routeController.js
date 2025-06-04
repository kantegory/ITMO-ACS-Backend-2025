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
exports.RouteController = void 0;
const routeService_1 = require("../services/routeService");
class RouteController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const route = yield routeService_1.RouteService.create(req.body);
                res.status(201).json(route);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create route';
                res.status(400).json({ message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routes = yield routeService_1.RouteService.findAll();
                res.json(routes);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get routes';
                res.status(500).json({ message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const route = yield routeService_1.RouteService.findById(Number(req.params.id));
                route
                    ? res.json(route)
                    : res.status(404).json({ message: 'Route not found' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get route';
                res.status(500).json({ message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const route = yield routeService_1.RouteService.update(Number(req.params.id), req.body);
                res.json(route);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update route';
                res.status(400).json({ message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield routeService_1.RouteService.delete(Number(req.params.id));
                res.json({ message: 'Route deleted successfully' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete route';
                res.status(400).json({ message });
            }
        });
    }
}
exports.RouteController = RouteController;
