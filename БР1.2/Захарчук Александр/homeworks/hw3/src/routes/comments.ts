import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const commentRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const commentRepository = dataSource.getRepository(Comment);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API для управления комментариями
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *     Recipe:
 *       type: object
 *       properties:
 *         recipe_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *     Comment:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *         text:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Создать комментарий
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - text
 *             properties:
 *               recipeId:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Комментарий успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Пользователь или рецепт не найден
 *       401:
 *         description: Неавторизован
 */
commentRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username});

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const { recipeId, text } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const comment = commentRepository.create({user, recipe, text});
    const results = await commentRepository.save(comment);
    res.send(results);
})

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Получить все комментарии
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список комментариев
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
commentRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const comments = await commentRepository
    .createQueryBuilder("comment")
    .select("comment.comment_id")
    .addSelect("comment.text")
    .addSelect("comment.created_at")
    .addSelect("comment.updated_at")
    .leftJoinAndSelect("comment.recipe", "recipe")
    .leftJoinAndSelect("comment.user", "user")
    .getMany();
    res.json(comments);
})

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Получить комментарий по ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Найденный комментарий
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Комментарий не найден
 */
commentRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const commentId = parseInt(req.params.id);
    const comment = await commentRepository
        .createQueryBuilder("comment")
        .select("comment.comment_id")
        .addSelect("comment.text")
        .addSelect("comment.created_at")
        .addSelect("comment.updated_at")
        .leftJoinAndSelect("comment.recipe", "recipe")
        .leftJoinAndSelect("comment.user", "user")
        .where("comment.comment_id = :comment_id", {comment_id: commentId})
        .getOne();
    if (!comment) {
        res.status(404).json({ detail: `Comment with id ${commentId} not found` });
        return;
    }
    res.send(comment);
})

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Обновить комментарий
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Комментарий обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Комментарий не найден
 */
commentRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const commentId = parseInt(req.params.id);
    const comment = await commentRepository.findOneBy({
        comment_id: commentId,
    });
    if (!comment) {
        res.status(404).json({ detail: `Comment with id ${commentId} not found` });
        return;
    }
    if (comment.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit comment with id ${commentId}` });
        return;
    }

    const { text } = req.body;
    commentRepository.merge(comment, {text});
    const results = await commentRepository.save(comment);
    res.send(results);
})

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Удалить комментарий
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий удалён
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Комментарий не найден
 */
commentRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const commentId = parseInt(req.params.id);
    const comment = await commentRepository.findOneBy({
        comment_id: commentId,
    });
    if (!comment) {
        res.status(404).json({ detail: `Comment with id ${commentId} not found` });
        return;
    }
    if (comment.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not delete comment with id ${commentId}` });
        return;
    }

    const results = await commentRepository.delete(commentId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Comment with id ${commentId} not found` });
        return;
    }
    res.send(results);
})

export default commentRouter;
