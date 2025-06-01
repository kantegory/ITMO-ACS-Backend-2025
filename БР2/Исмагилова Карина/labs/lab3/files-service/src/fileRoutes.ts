import { Router } from "express";
import { fileController } from "./fileController";
import authMiddleware from "./auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/files:
 *   get:
 *     summary: Получить список всех файлов
 *     tags:
 *       - Files
 *     responses:
 *       200:
 *         description: Список файлов
 */
router.get("/", fileController.getAllFiles);

/**
 * @openapi
 * /api/files/{id}:
 *   get:
 *     summary: Получить файл по ID
 *     tags:
 *       - Files
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найденный файл
 *       404:
 *         description: Файл не найден
 */
router.get("/:id", fileController.getFileById);

/**
 * @openapi
 * /api/files:
 *   post:
 *     summary: Загрузить новый файл
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file_path
 *             properties:
 *               file_path:
 *                 type: string
 *                 format: uri
 *                 description: Ссылка на файл
 *               recipe:
 *                 type: object
 *                 properties:
 *                   recipe_id:
 *                     type: integer
 *                     description: ID рецепта
 *               article:
 *                 type: object
 *                 properties:
 *                   article_id:
 *                     type: integer
 *                     description: ID статьи
 *     responses:
 *       201:
 *         description: Файл загружен
 *       400:
 *         description: Ошибка при загрузке
 */
router.post("/", authMiddleware, fileController.createFile);

/**
 * @openapi
 * /api/files/{id}:
 *   patch:
 *     summary: Обновить файл
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Файл обновлён
 *       404:
 *         description: Файл не найден
 */
router.patch("/:id", authMiddleware, fileController.updateFile);

/**
 * @openapi
 * /api/files/{id}:
 *   delete:
 *     summary: Удалить файл
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Файл удалён
 *       404:
 *         description: Файл не найден
 */
router.delete("/:id", authMiddleware, fileController.deleteFile);
export default router;
