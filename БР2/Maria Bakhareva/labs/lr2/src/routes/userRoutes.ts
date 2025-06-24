import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';
import { validatorChangePassword } from "../middleware/validator/validatorChangePassword";
import { validatorUpdateUser } from "../middleware/validator/validatorUpdateUser";
import { validatorLogin } from "../middleware/validator/validatorLogin";
import { validatorRegister } from "../middleware/validator/validatorRegister";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Forbidden (Only Admin)
 */
router.get('/', checkJwt, checkRole(UserRole.ADMIN), UserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', checkJwt, UserController.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [tenant, landlord, admin]
 *     responses:
 *       200:
 *         description: User updated
 *       403:
 *         description: Forbidden (Not the user owner)
 *       404:
 *         description: User not found
 */
router.put(
  '/:id',
  checkJwt,
  checkOwnership('user', 'user_id'),
  validatorUpdateUser,
  UserController.update
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       403:
 *         description: Forbidden (Not the user owner)
 *       404:
 *         description: User not found
 */
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('user', 'user_id'),
  UserController.delete
);

/**
 * @swagger
 * /api/users/{id}/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       400:
 *         description: Invalid current password
 *       404:
 *         description: User not found
 */
router.post('/:id/change-password', checkJwt, validatorChangePassword, UserController.changePassword);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', validatorLogin, UserController.login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [tenant, landlord, admin]
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error
 */
router.post('/register', validatorRegister, UserController.register);

export default router;
