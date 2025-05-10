import { Router } from "express";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { dataSource } from "../dataSource";
import { checkJwt } from "../middleware/validateJWT";

const userRouter = Router();
const userRepository = dataSource.getRepository(User);

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (hash: string, password: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         profile_picture:
 *           type: string
 *         bio:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - username
 *         - email
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создание нового пользователя
 *     tags: [Users]
 *     security:
 *       - []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка валидации
 */
userRouter.post("/", async function (req: Request, res: Response) {
    const { password } = req.body;
    req.body.password_hash = await hashPassword(password);
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.send(result);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Логин пользователя
 *     tags: [Users]
 *     security:
 *       - []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход и получение токена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Неверные учетные данные
 *       404:
 *         description: Пользователь не найден
 */
userRouter.post("/login", async function (req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userRepository
    .createQueryBuilder("user")
    .addSelect("user.password_hash")
    .where("user.username = :username", { username })
    .getOne();

    if (!user) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }

    const passwordMatch = await comparePassword(user.password_hash, password);

    if (!passwordMatch){
        res.status(401).json({detail: "Unauthorized"});
        return;
    }

    const token = jwt.sign(
        {username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN},
    );

    res.send({token});
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Неавторизован
 */
userRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const results = await userRepository
        .createQueryBuilder("user")
        .select("user.username")
        .addSelect("user.email")
        .addSelect("user.profile_picture")
        .addSelect("user.bio")
        .addSelect("user.created_at")
        .addSelect("user.updated_at")
        .getMany();
    res.json(results);
});

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Получить пользователя по имени
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
userRouter.get("/:username", [checkJwt], async function (req: Request, res: Response) {
    const username = req.params.username;
    const results = await userRepository
        .createQueryBuilder("user")
        .select("user.username")
        .addSelect("user.email")
        .addSelect("user.profile_picture")
        .addSelect("user.bio")
        .addSelect("user.created_at")
        .addSelect("user.updated_at")
        .where("user.username = :username", {username})
        .getOne();

    if (!results) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    res.send(results);
});

/**
 * @swagger
 * /users/{username}:
 *   put:
 *     summary: Обновить данные пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные пользователя обновлены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
userRouter.put("/:username", [checkJwt], async function (req: Request, res: Response) {
    const username = req.params.username;
    const user = await userRepository.findOneBy({
        username,
    });
    if (!user) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }

    const {password} = req.body;

    if (password) {
        delete req.body.password;
        req.body.password_hash = await hashPassword(password);
    }

    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    res.send(results);
});

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
userRouter.delete("/:username", [checkJwt], async function (req: Request, res: Response) {
    const username = req.params.username;
    const results = await userRepository.delete(username);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    res.send(results);
});

export default userRouter;
