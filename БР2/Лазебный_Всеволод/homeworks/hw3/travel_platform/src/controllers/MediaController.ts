import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Media } from "../entities/Media";

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Управление медиафайлами
 *
 * components:
 *   schemas:
 *     MediaCreate:
 *       type: object
 *       required:
 *         - route_id
 *         - url
 *         - media_type
 *       properties:
 *         route_id:
 *           type: integer
 *           example: 1
 *         url:
 *           type: string
 *           example: https://example.com/image.jpg
 *         media_type:
 *           type: string
 *           enum: [image, video]
 *           example: image
 *         caption:
 *           type: string
 *           example: Описание медиа
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         url:
 *           type: string
 *         media_type:
 *           type: string
 *           enum: [image, video]
 *         caption:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

export default class MediaController {
    /**
     * @swagger
     * /media:
     *   get:
     *     summary: Получить все медиафайлы
     *     tags: [Media]
     *     responses:
     *       200:
     *         description: Список медиафайлов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Media'
     */
    async getAll(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).find({
            relations: ["route"]
        });
        res.json(media);
    }

    /**
     * @swagger
     * /media/{id}:
     *   get:
     *     summary: Получить медиафайл по ID
     *     tags: [Media]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Данные медиафайла
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Media'
     *       404:
     *         description: Медиафайл не найден
     */
    async getById(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).findOneBy({
            id: parseInt(req.params.id)
        });
        res.json(media);
    }

    /**
     * @swagger
     * /media:
     *   post:
     *     summary: Создать новый медиафайл
     *     tags: [Media]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MediaCreate'
     *     responses:
     *       201:
     *         description: Медиафайл успешно создан
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Media'
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async create(req: Request, res: Response) {
        const media = AppDataSource.getRepository(Media).create(req.body);
        const results = await AppDataSource.getRepository(Media).save(media);
        res.status(201).json(results);
    }

    /**
     * @swagger
     * /media/{id}:
     *   put:
     *     summary: Обновить медиафайл
     *     tags: [Media]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Media'
     *     responses:
     *       200:
     *         description: Медиафайл обновлен
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Media'
     *       404:
     *         description: Медиафайл не найден
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async update(req: Request, res: Response) {
        const media = await AppDataSource.getRepository(Media).findOneBy({
            id: parseInt(req.params.id)
        });
        if (media) {
            AppDataSource.getRepository(Media).merge(media, req.body);
            const results = await AppDataSource.getRepository(Media).save(media);
            res.json(results);
        } else {
            res.status(404).json({ message: "Media not found" });
        }
    }

    /**
     * @swagger
     * /media/{id}:
     *   delete:
     *     summary: Удалить медиафайл
     *     tags: [Media]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Медиафайл удален
     *       401:
     *         $ref: '#/components/responses/UnauthorizedError'
     */
    async delete(req: Request, res: Response) {
        const results = await AppDataSource.getRepository(Media).delete(req.params.id);
        res.json(results);
    }
}