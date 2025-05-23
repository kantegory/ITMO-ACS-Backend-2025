import { Router } from 'express';
import { WorkoutController } from '../controllers/workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutController = new WorkoutController();

/**
 * @openapi
 * /workouts/search:
 *   get:
 *     tags: [Workouts]
 *     summary: Поиск тренировок по фильтрам
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/levelFilter'
 *       - $ref: '#/components/parameters/typeFilter'
 *       - $ref: '#/components/parameters/durationMinFilter'
 *       - $ref: '#/components/parameters/durationMaxFilter'
 *     responses:
 *       200:
 *         description: Список найденных тренировок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/search', authMiddleware, workoutController.searchWorkout);

/**
 * @openapi
 * /workouts:
 *   get:
 *     tags: [Workouts]
 *     summary: Получить все тренировки
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех тренировок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, workoutController.getAllWorkouts);

/**
 * @openapi
 * /workouts/{id}:
 *   get:
 *     tags: [Workouts]
 *     summary: Получить тренировку по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тренировки
 *     responses:
 *       200:
 *         description: Данные тренировки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Тренировка не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, workoutController.getWorkoutById);

/**
 * @openapi
 * /workouts:
 *   post:
 *     tags: [Workouts]
 *     summary: Создать новую тренировку
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkout'
 *     responses:
 *       201:
 *         description: Тренировка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, workoutController.createWorkout);

/**
 * @openapi
 * /workouts/{id}:
 *   put:
 *     tags: [Workouts]
 *     summary: Обновить тренировку
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тренировки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkout'
 *     responses:
 *       200:
 *         description: Обновленная тренировка
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Тренировка не найдена
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, workoutController.updateWorkout);

/**
 * @openapi
 * /workouts/{id}:
 *   delete:
 *     tags: [Workouts]
 *     summary: Удалить тренировку
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тренировки
 *     responses:
 *       204:
 *         description: Тренировка успешно удалена
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Тренировка не найдена
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, workoutController.deleteWorkout);

export default router;