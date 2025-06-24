import { Router, RequestHandler } from 'express';
import { PlanProgressController } from '../controllers/plan-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const planProgressController = new PlanProgressController();

/**
 * @openapi
 * /plan-progress/my-plan-progresses:
 *   get:
 *     tags: [PlanProgress]
 *     summary: Получить все прогрессы текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список прогрессов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-plan-progresses', authMiddleware, planProgressController.getAllMyPlanProgresses as RequestHandler);

/**
 * @openapi
 * /plan-progress/my-plan-progresses/{planId}:
 *   get:
 *     tags: [PlanProgress]
 *     summary: Получить прогрессы по конкретному плану
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плана
 *     responses:
 *       200:
 *         description: Список прогрессов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanProgress'
 *       400:
 *         description: Некорректный ID плана
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-plan-progresses/:planId', authMiddleware, planProgressController.getMyPlanProgressesByPlan as RequestHandler);

/**
 * @openapi
 * /plan-progress:
 *   get:
 *     tags: [PlanProgress]
 *     summary: Получить все записи прогресса
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех прогрессов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, planProgressController.getAllPlanProgress);

/**
 * @openapi
 * /plan-progress/{id}:
 *   get:
 *     tags: [PlanProgress]
 *     summary: Получить прогресс по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи прогресса
 *     responses:
 *       200:
 *         description: Данные прогресса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, planProgressController.getPlanProgressById);

/**
 * @openapi
 * /plan-progress:
 *   post:
 *     tags: [PlanProgress]
 *     summary: Создать новую запись прогресса
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlanProgress'
 *     responses:
 *       201:
 *         description: Запись создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, planProgressController.createPlanProgress);

/**
 * @openapi
 * /plan-progress/{id}:
 *   put:
 *     tags: [PlanProgress]
 *     summary: Обновить запись прогресса
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи прогресса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePlanProgress'
 *     responses:
 *       200:
 *         description: Обновленная запись
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, planProgressController.updatePlanProgress);

/**
 * @openapi
 * /plan-progress/{id}:
 *   delete:
 *     tags: [PlanProgress]
 *     summary: Удалить запись прогресса
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи прогресса
 *     responses:
 *       204:
 *         description: Запись удалена
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка удаления
 */
router.delete('/:id', authMiddleware, planProgressController.deletePlanProgress);

export default router;