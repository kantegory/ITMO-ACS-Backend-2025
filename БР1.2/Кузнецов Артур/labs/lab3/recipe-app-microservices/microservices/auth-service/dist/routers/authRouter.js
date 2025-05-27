"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   - name: Auth
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *     RegisterResponse:
 *       type: object
 *       required:
 *         - id
 *         - first_name
 *         - last_name
 *         - token
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         token:
 *           type: string
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 */
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Регистрация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Invalid input or email already in use
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', authController_1.register);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid Input
 *       401:
 *         description: Invalid Credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', authController_1.login);
exports.default = router;
