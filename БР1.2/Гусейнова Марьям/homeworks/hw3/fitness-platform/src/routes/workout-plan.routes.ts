import { Router, RequestHandler } from 'express';
import { WorkoutPlanController } from '../controllers/workout-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutPlanController = new WorkoutPlanController();

/**
 * @openapi
 * /plans/my-plans:
 *   get:
 *     tags: [WorkoutPlans]
 *     summary: Получить планы текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список планов пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutPlan'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-plans', authMiddleware, workoutPlanController.getAllMyWorkoutPlans as RequestHandler);

/**
 * @openapi
 * /plans:
 *   get:
 *     tags: [WorkoutPlans]
 *     summary: Получить все планы тренировок
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех планов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutPlan'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, workoutPlanController.getAllWorkoutPlans);

/**
 * @openapi
 * /plans/{id}:
 *   get:
 *     tags: [WorkoutPlans]
 *     summary: Получить план по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана тренировок
 *     responses:
 *       200:
 *         description: Данные плана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutPlan'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: План не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, workoutPlanController.getWorkoutPlanById);

/**
 * @openapi
 * /plans:
 *   post:
 *     tags: [WorkoutPlans]
 *     summary: Создать новый план
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkoutPlan'
 *     responses:
 *       201:
 *         description: План создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutPlan'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, workoutPlanController.createWorkoutPlan);

/**
 * @openapi
 * /plans/{id}:
 *   put:
 *     tags: [WorkoutPlans]
 *     summary: Обновить план тренировок
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkoutPlan'
 *     responses:
 *       200:
 *         description: Обновленный план
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutPlan'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: План не найден
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, workoutPlanController.updateWorkoutPlan);

/**
 * @openapi
 * /plans/{id}:
 *   delete:
 *     tags: [WorkoutPlans]
 *     summary: Удалить план тренировок
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
 *     responses:
 *       204:
 *         description: План удален
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: План не найден
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, workoutPlanController.deleteWorkoutPlan);

export default router;