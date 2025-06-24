import { Router } from 'express';
import { WorkoutInPlanController } from '../controllers/workout-in-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutInPlanController = new WorkoutInPlanController();

/**
 * @openapi
 * /workout-in-plan:
 *   get:
 *     tags: [WorkoutInPlans]
 *     summary: Получить все связи тренировок с планами
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
 *                 $ref: '#/components/schemas/WorkoutInPlan'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, workoutInPlanController.getAllWorkoutInPlans);

/**
 * @openapi
 * /workout-in-plan/{id}:
 *   get:
 *     tags: [WorkoutInPlans]
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
 *               $ref: '#/components/schemas/WorkoutInPlan'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Связь не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, workoutInPlanController.getWorkoutInPlanById);

/**
 * @openapi
 * /workout-in-plan:
 *   post:
 *     tags: [WorkoutInPlans]
 *     summary: Создать новую связь
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkoutInPlan'
 *     responses:
 *       201:
 *         description: Связь создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutInPlan'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, workoutInPlanController.createWorkoutInPlan);

/**
 * @openapi
 * /workout-in-plan/{id}:
 *   put:
 *     tags: [WorkoutInPlans]
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
 *             $ref: '#/components/schemas/UpdateWorkoutInPlan'
 *     responses:
 *       200:
 *         description: Обновленная связь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutInPlan'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Связь не найдена
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, workoutInPlanController.updateWorkoutInPlan);

/**
 * @openapi
 * /workout-in-plan/{id}:
 *   delete:
 *     tags: [WorkoutInPlans]
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
router.delete('/:id', authMiddleware, workoutInPlanController.deleteWorkoutInPlan);

export default router;