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
const resumeController = __importStar(require("../controller/resume.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: API для работы с резюме
 */
/**
 * @swagger
 * /api/resumes:
 *   post:
 *     summary: Создать новое резюме
 *     tags: [Resumes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - skills
 *               - contactInfo
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               skills:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Резюме успешно создано
 */
router.post("/resumes", resumeController.createResume);
/**
 * @swagger
 * /api/resumes:
 *   get:
 *     summary: Получить список всех резюме
 *     tags: [Resumes]
 *     responses:
 *       200:
 *         description: Список резюме
 */
router.get("/resumes", resumeController.getResumes);
/**
 * @swagger
 * /api/resumes/{id}:
 *   get:
 *     summary: Получить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     responses:
 *       200:
 *         description: Резюме найдено
 *       404:
 *         description: Резюме не найдено
 */
router.get("/resumes/:id", resumeController.getResumeById);
/**
 * @swagger
 * /api/resumes/{id}:
 *   put:
 *     summary: Обновить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               skills:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Резюме обновлено
 *       404:
 *         description: Резюме не найдено
 */
router.put("/resumes/:id", resumeController.updateResume);
/**
 * @swagger
 * /api/resumes/{id}:
 *   delete:
 *     summary: Удалить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     responses:
 *       204:
 *         description: Резюме удалено
 *       404:
 *         description: Резюме не найдено
 */
router.delete("/resumes/:id", resumeController.deleteResume);
exports.default = router;
