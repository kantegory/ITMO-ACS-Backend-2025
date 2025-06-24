import { Router } from 'express';
import { ExerciseWorkoutController } from '../controllers/exercise-workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseWorkoutController = new ExerciseWorkoutController();

/**
 * @openapi
 * /exercise-workouts:
 *   get:
 *     tags: [ExerciseWorkouts]
 *     summary: Получить все связи упражнений с тренировками
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список связей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseWorkout'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, exerciseWorkoutController.getAllExerciseWorkouts);

/**
 * @openapi
 * /exercise-workouts/{id}:
 *   get:
 *     tags: [ExerciseWorkouts]
 *     summary: Получить связь по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID связи
 *     responses:
 *       200:
 *         description: Данные связи
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseWorkout'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Связь не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, exerciseWorkoutController.getExerciseWorkoutById);

/**
 * @openapi
 * /exercise-workouts:
 *   post:
 *     tags: [ExerciseWorkouts]
 *     summary: Создать новую связь
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExerciseWorkout'
 *     responses:
 *       201:
 *         description: Связь создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseWorkout'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, exerciseWorkoutController.createExerciseWorkout);

/**
 * @openapi
 * /exercise-workouts/{id}:
 *   put:
 *     tags: [ExerciseWorkouts]
 *     summary: Обновить связь
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID связи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExerciseWorkout'
 *     responses:
 *       200:
 *         description: Обновленная связь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseWorkout'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Связь не найдена
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, exerciseWorkoutController.updateExerciseWorkout);

/**
 * @openapi
 * /exercise-workouts/{id}:
 *   delete:
 *     tags: [ExerciseWorkouts]
 *     summary: Удалить связь
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID связи
 *     responses:
 *       204:
 *         description: Связь удалена
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Связь не найдена
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, exerciseWorkoutController.deleteExerciseWorkout);

export default router;