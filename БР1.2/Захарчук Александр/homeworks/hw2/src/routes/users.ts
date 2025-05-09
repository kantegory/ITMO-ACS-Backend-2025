import { Router } from "express";
import { Request, Response } from "express"
import { User } from "../entities/User"
import { dataSource } from "../dataSource"

const userRouter = Router();
const userRepository = dataSource.getRepository(User);

userRouter.post("/", async function (req: Request, res: Response) {
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    res.send(results);
})

userRouter.get("/", async function (req: Request, res: Response) {
    const results = await userRepository
        .createQueryBuilder("user")
        .select("user.username")
        .addSelect("user.email")
        .addSelect("user.profile_picture")
        .addSelect("user.bio")
        .getMany()
    res.json(results);
})

userRouter.get("/:username", async function (req: Request, res: Response) {
    const username = req.params.username;
    const results = await userRepository
        .createQueryBuilder("user")
        .select("user.username")
        .addSelect("user.email")
        .addSelect("user.profile_picture")
        .addSelect("user.bio")
        .where("user.username = :username", {username})
        .getOne()

    if (!results) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    res.send(results);
})

userRouter.put("/:username", async function (req: Request, res: Response) {
    const username = req.params.username;
    const user = await userRepository.findOneBy({
        username,
    });
    if (!user) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    res.send(results);
})

userRouter.delete("/:username", async function (req: Request, res: Response) {
    const username = req.params.username;
    const results = await userRepository.delete(username)
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    res.send(results);
})

export default userRouter;
