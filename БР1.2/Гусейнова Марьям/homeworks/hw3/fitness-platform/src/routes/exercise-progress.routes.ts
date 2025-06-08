import { Router, RequestHandler } from 'express';
import { ExerciseProgressController } from '../controllers/exercise-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseProgressController = new ExerciseProgressController();

/**
 * @openapi
 * /exercise-progress/my-exercise-progresses:
 *   get:
 *     tags: [ExerciseProgress]
 *     summary: Получить прогрессы текущего пользователя
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список прогресса
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-exercise-progresses', authMiddleware, exerciseProgressController.getAllMyExerciseProgresses as RequestHandler);

/**
 * @openapi
 * /exercise-progress/my-exercise-progresses/{exerciseId}:
 *   get:
 *     tags: [ExerciseProgress]
 *     summary: Получить прогресс текущего пользователя по конкретному упражнению
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID упражнения
 *     responses:
 *       200:
 *         description: Список прогресса
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseProgress'
 *       400:
 *         description: Некорректный ID упражнения
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/my-exercise-progresses/:exerciseId', authMiddleware, exerciseProgressController.getMyExerciseProgressesByExercise as RequestHandler);

/**
 * @openapi
 * /exercise-progress:
 *   get:
 *     tags: [ExerciseProgress]
 *     summary: Получить весь прогресс
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список всего прогресса
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authMiddleware, exerciseProgressController.getAllExerciseProgress);

/**
 * @openapi
 * /exercise-progress/{id}:
 *   get:
 *     tags: [ExerciseProgress]
 *     summary: Получить запись прогресса по ID
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
 *               $ref: '#/components/schemas/ExerciseProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', authMiddleware, exerciseProgressController.getExerciseProgressById);

/**
 * @openapi
 * /exercise-progress:
 *   post:
 *     tags: [ExerciseProgress]
 *     summary: Создать новую запись прогресса
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExerciseProgress'
 *     responses:
 *       201:
 *         description: Запись создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseProgress'
 *       401:
 *         description: Требуется авторизация
 *       500:
 *         description: Ошибка создания
 */
router.post('/', authMiddleware, exerciseProgressController.createExerciseProgress);

/**
 * @openapi
 * /exercise-progress/{id}:
 *   put:
 *     tags: [ExerciseProgress]
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
 *             $ref: '#/components/schemas/UpdateExerciseProgress'
 *     responses:
 *       200:
 *         description: Обновленная запись
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseProgress'
 *       401:
 *         description: Требуется авторизация
 *       404:
 *         description: Прогресс не найден
 *       500:
 *         description: Ошибка обновления
 */
router.put('/:id', authMiddleware, exerciseProgressController.updateExerciseProgress);

/**
 * @openapi
 * /exercise-progress/{id}:
 *   delete:
 *     tags: [ExerciseProgress]
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
router.delete('/:id', authMiddleware, exerciseProgressController.deleteExerciseProgress);

export default router;