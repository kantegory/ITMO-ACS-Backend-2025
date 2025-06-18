"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const authMiddleware_1 = require("@recipe-app/common-service/src/middleware/authMiddleware");
const adminOnlyMiddleware_1 = require("@recipe-app/common-service/src/middleware/adminOnlyMiddleware");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   - name: Role
 */
/**
 * @openapi
 * /role/:
 *   get:
 *     tags:
 *       - Role
 *     summary: Список ролей
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', roleController_1.getRoles);
/**
 * @openapi
 * /role/{id}:
 *   get:
 *     tags:
 *       - Role
 *     summary: Роль
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', roleController_1.getRole);
/**
 * @openapi
 * /role/:
 *   post:
 *     tags:
 *       - Role
 *     summary: Создать роль
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, roleController_1.createRole);
/**
 * @openapi
 * /role/{id}:
 *   put:
 *     tags:
 *       - Role
 *     summary: Обновление роли
 *     security:
 *       - bearerAuth: []
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
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, roleController_1.updateRole);
/**
 * @openapi
 * /role/{id}:
 *   delete:
 *     tags:
 *       - Role
 *     summary: Удаление роли
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, roleController_1.deleteRole);
exports.default = router;
