import { Router, RequestHandler } from 'express';
import { CurrentProgressController } from '../controllers/current-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const currentProgressController = new CurrentProgressController();

/**
 * @openapi
 * /current-progress/my-progress:
 *   get:
 *     tags: [CurrentProgress]
 *     summary: Получить текущий прогресс текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные текущего прогресса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-progress', authMiddleware, currentProgressController.getMyCurrentProgress as RequestHandler);

/**
 * @openapi
 * /current-progress:
 *   get:
 *     tags: [CurrentProgress]
 *     summary: Получить все записи о прогрессе
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
 *                 $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, currentProgressController.getAllCurrentProgress);

/**
 * @openapi
 * /current-progress/{id}:
 *   get:
 *     tags: [CurrentProgress]
 *     summary: Получить прогресс по ID записи
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
 *               $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Запись не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, currentProgressController.getCurrentProgressById);

/**
 * @openapi
 * /current-progress/user/{userId}:
 *   get:
 *     tags: [CurrentProgress]
 *     summary: Получить прогресс по ID пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные прогресса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/user/:userId', authMiddleware, currentProgressController.getCurrentProgressByUserId);

/**
 * @openapi
 * /current-progress:
 *   post:
 *     tags: [CurrentProgress]
 *     summary: Создать новую запись прогресса
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCurrentProgress'
 *     responses:
 *       201:
 *         description: Запись создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, currentProgressController.createCurrentProgress);

/**
 * @openapi
 * /current-progress/user/{userId}:
 *   put:
 *     tags: [CurrentProgress]
 *     summary: Обновить прогресс пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCurrentProgress'
 *     responses:
 *       200:
 *         description: Обновленные данные
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка обновления
 */
router.put('/user/:userId', authMiddleware, currentProgressController.updateCurrentProgress);

/**
 * @openapi
 * /current-progress/user/{userId}:
 *   delete:
 *     tags: [CurrentProgress]
 *     summary: Удалить прогресс пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
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
router.delete('/user/:userId', authMiddleware, currentProgressController.deleteCurrentProgress);

export default router;