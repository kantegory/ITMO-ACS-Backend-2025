import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseController = new ExerciseController();

/**
 * @openapi
 * /exercises:
 *   get:
 *     tags: [Exercises]
 *     summary: Получить все упражнения
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список упражнений
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, exerciseController.getAllExercises);

/**
 * @openapi
 * /exercises/{id}:
 *   get:
 *     tags: [Exercises]
 *     summary: Получить упражнение по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID упражнения
 *     responses:
 *       200:
 *         description: Данные упражнения
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Упражнение не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, exerciseController.getExerciseById);

/**
 * @openapi
 * /exercises:
 *   post:
 *     tags: [Exercises]
 *     summary: Создать новое упражнение
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExercise'
 *     responses:
 *       201:
 *         description: Упражнение создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, exerciseController.createExercise);

/**
 * @openapi
 * /exercises/{id}:
 *   put:
 *     tags: [Exercises]
 *     summary: Обновить упражнение
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID упражнения
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExercise'
 *     responses:
 *       200:
 *         description: Обновленное упражнение
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Упражнение не найдено
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, exerciseController.updateExercise);

/**
 * @openapi
 * /exercises/{id}:
 *   delete:
 *     tags: [Exercises]
 *     summary: Удалить упражнение
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID упражнения
 *     responses:
 *       204:
 *         description: Упражнение удалено
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Упражнение не найдено
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, exerciseController.deleteExercise);

export default router;