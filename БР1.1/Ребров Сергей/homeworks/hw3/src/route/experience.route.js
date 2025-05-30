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
const experienceController = __importStar(require("../controller/experience.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Experiences
 *   description: API для работы с опытом
 */
/**
 * @swagger
 * /api/experiences:
 *   post:
 *     summary: Создать новый опыт
 *     tags: [Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeId
 *               - title
 *               - description
 *               - company
 *               - startDate
 *               - endDate
 *             properties:
 *               resumeId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Опыт успешно создан
 */
router.post("/experiences", experienceController.createExperience);
/**
 * @swagger
 * /api/experiences:
 *   get:
 *     summary: Получить список всех опытов
 *     tags: [Experiences]
 *     responses:
 *       200:
 *         description: Список опытов
 */
router.get("/experiences", experienceController.getExperiences);
/**
 * @swagger
 * /api/experiences/{id}:
 *   get:
 *     summary: Получить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
 *     responses:
 *       200:
 *         description: Опыт найден
 *       404:
 *         description: Опыт не найден
 */
router.get("/experiences/:id", experienceController.getExperienceById);
/**
 * @swagger
 * /api/experiences/{id}:
 *   put:
 *     summary: Обновить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Опыт обновлен
 *       404:
 *         description: Опыт не найден
 */
router.put("/experiences/:id", experienceController.updateExperience);
/**
 * @swagger
 * /api/experiences/{id}:
 *   delete:
 *     summary: Удалить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
 *     responses:
 *       204:
 *         description: Опыт удален
 *       404:
 *         description: Опыт не найден
 */
router.delete("/experiences/:id", experienceController.deleteExperience);
exports.default = router;
