import { Router } from "express";
import { fileController } from "../controllers/fileController";
import authMiddleware from "../middleware/auth.middleware";

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
router.get("/files", fileController.getAllFiles);

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
router.get("/files/:id", fileController.getFileById);

/**
 * @openapi
 * /api/files/create:
 *   post:
 *     summary: Загрузить новый файл
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
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
 *       201:
 *         description: Файл загружен
 *       400:
 *         description: Ошибка при загрузке
 */
router.post("/files/create", authMiddleware, fileController.createFile);

/**
 * @openapi
 * /api/files/update/{id}:
 *   put:
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
router.put("/files/update/:id", authMiddleware, fileController.updateFile);

/**
 * @openapi
 * /api/files/delete/{id}:
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
router.delete("/files/delete/:id", authMiddleware, fileController.deleteFile);

