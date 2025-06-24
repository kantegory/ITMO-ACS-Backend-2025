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
const roleController = __importStar(require("../controller/role.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API для работы с ролями
 */
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Создать новую роль
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Роль успешно создана
 *       400:
 *         description: Отсутствует поле 'name'
 */
router.post("/roles", roleController.createRole);
/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Получить все роли
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Список всех ролей
 */
router.get("/roles", roleController.getRoles);
/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Получить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       200:
 *         description: Роль найдена
 *       404:
 *         description: Роль не найдена
 */
router.get("/roles/:id", roleController.getRoleById);
/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Обновить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Роль обновлена
 *       400:
 *         description: Некорректные данные
 *       404:
 *         description: Роль не найдена
 */
router.put("/roles/:id", roleController.updateRole);
/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Удалить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       204:
 *         description: Роль успешно удалена
 *       404:
 *         description: Роль не найдена
 */
router.delete("/roles/:id", roleController.deleteRole);
exports.default = router;
