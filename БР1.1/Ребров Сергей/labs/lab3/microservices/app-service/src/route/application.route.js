"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationController = __importStar(require("../controller/application.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API для работы с откликами на вакансии
 */
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Создать отклик на вакансию
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - jobId
 *               - coverLetter
 *               - status
 *             properties:
 *               userId:
 *                 type: integer
 *               jobId:
 *                 type: integer
 *               coverLetter:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Отклик успешно создан
 */
router.post("/applications", applicationController.createApplication);
/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Получить список всех откликов
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Список откликов
 */
router.get("/applications", applicationController.getApplications);
/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Получить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     responses:
 *       200:
 *         description: Отклик найден
 *       404:
 *         description: Отклик не найден
 */
router.get("/applications/:id", applicationController.getApplicationById);
/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Обновить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverLetter:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Отклик обновлён
 *       404:
 *         description: Отклик не найден
 */
router.put("/applications/:id", applicationController.updateApplication);
/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Удалить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     responses:
 *       204:
 *         description: Отклик удалён
 *       404:
 *         description: Отклик не найден
 */
router.delete("/applications/:id", applicationController.deleteApplication);
exports.default = router;
