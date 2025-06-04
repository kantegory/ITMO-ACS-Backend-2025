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
exports.MediaController = void 0;
const mediaService_1 = require("../services/mediaService");
class MediaController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield mediaService_1.MediaService.create(req.body);
                res.status(201).json(media);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create media';
                res.status(400).json({ message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield mediaService_1.MediaService.findAll();
                res.json(media);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get media';
                res.status(500).json({ message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield mediaService_1.MediaService.findById(Number(req.params.id));
                media
                    ? res.json(media)
                    : res.status(404).json({ message: 'Media not found' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to get media';
                res.status(500).json({ message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mediaService_1.MediaService.delete(Number(req.params.id));
                res.json({ message: 'Media deleted successfully' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete media';
                res.status(400).json({ message });
            }
        });
    }
}
exports.MediaController = MediaController;
