import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource";
import { Like } from "../entities/Like";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const likeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const likeRepository = dataSource.getRepository(Like);

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API для управления лайками рецептов
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         like_id:
 *           type: integer
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *         recipe:
 *           type: object
 *           properties:
 *             recipe_id:
 *               type: integer
 *             title:
 *               type: string
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Поставить лайк рецепту
 *     tags: [Likes]
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
 *             properties:
 *               recipeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Лайк успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       404:
 *         description: Пользователь или рецепт не найден
 *       401:
 *         description: Неавторизован
 */
likeRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const { recipeId } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const like = likeRepository.create({user, recipe});
    const results = await likeRepository.save(like);
    res.send(results);
});

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Получить лайки текущего пользователя
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список лайков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Неавторизован
 */
likeRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const queryBuilder = likeRepository.createQueryBuilder("like");
    const likes = await queryBuilder
        .leftJoinAndSelect("like.recipe", "recipe")
        .leftJoinAndSelect("like.user", "user")
        .where("user.username = :username", {username: user.username})
        .getMany();
    res.json(likes);
});

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Удалить лайк по ID
 *     tags: [Likes]
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
 *         description: Лайк удалён
 *       403:
 *         description: Нет прав на удаление лайка
 *       404:
 *         description: Лайк не найден
 *       401:
 *         description: Неавторизован
 */
likeRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const likeId = parseInt(req.params.id);
    const like = await likeRepository.findOneBy({like_id: likeId});

    if (!like) {
        res.status(404).json({detail: `Like with id ${likeId} not found`});
        return;
    }
    if (like.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({detail: `You can not delete like with id ${likeId}`});
        return;
    }

    const results = await likeRepository.delete(likeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Like with id ${likeId} not found` });
        return;
    }
    res.send(results);
});

export default likeRouter;
