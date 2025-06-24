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
const educationController = __importStar(require("../controller/education.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: API для работы с информацией об образовании
 */
/**
 * @swagger
 * /api/educations:
 *   post:
 *     summary: Создать запись об образовании
 *     tags: [Educations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeId
 *               - institution
 *               - degree
 *               - startDate
 *             properties:
 *               resumeId:
 *                 type: integer
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Запись об образовании успешно создана
 *       500:
 *         description: Ошибка сервера
 */
router.post("/educations", educationController.createEducation);
/**
 * @swagger
 * /api/educations:
 *   get:
 *     summary: Получить список всех записей об образовании
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: Список всех записей об образовании
 *       500:
 *         description: Ошибка сервера
 */
router.get("/educations", educationController.getEducations);
/**
 * @swagger
 * /api/educations/{id}:
 *   get:
 *     summary: Получить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     responses:
 *       200:
 *         description: Запись об образовании найдена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get("/educations/:id", educationController.getEducationById);
/**
 * @swagger
 * /api/educations/{id}:
 *   put:
 *     summary: Обновить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Запись об образовании обновлена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.put("/educations/:id", educationController.updateEducation);
/**
 * @swagger
 * /api/educations/{id}:
 *   delete:
 *     summary: Удалить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     responses:
 *       204:
 *         description: Запись об образовании удалена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/educations/:id", educationController.deleteEducation);
exports.default = router;
