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
const jobController = __importStar(require("../controller/job.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API для работы с вакансиями
 */
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Создать новую вакансию
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - description
 *               - requirements
 *               - salaryMin
 *               - salaryMax
 *               - experience
 *               - location
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salaryMin:
 *                 type: integer
 *               salaryMax:
 *                 type: integer
 *               experience:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Вакансия успешно создана
 */
router.post("/jobs", jobController.createJob);
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Получить список всех вакансий
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Список вакансий
 */
router.get("/jobs", jobController.getJobs);
/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Получить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
 *     responses:
 *       200:
 *         description: Вакансия найдена
 *       404:
 *         description: Вакансия не найдена
 */
router.get("/jobs/:id", jobController.getJobById);
/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Обновить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
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
 *               requirements:
 *                 type: string
 *               salaryMin:
 *                 type: integer
 *               salaryMax:
 *                 type: integer
 *               experience:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Вакансия обновлена
 *       404:
 *         description: Вакансия не найдена
 */
router.put("/jobs/:id", jobController.updateJob);
/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Удалить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
 *     responses:
 *       204:
 *         description: Вакансия удалена
 *       404:
 *         description: Вакансия не найдена
 */
router.delete("/jobs/:id", jobController.deleteJob);
exports.default = router;
