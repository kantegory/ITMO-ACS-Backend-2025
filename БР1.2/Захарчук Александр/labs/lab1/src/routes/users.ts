import { Router } from "express";
import { Request, Response } from "express"
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User"
import { dataSource } from "../dataSource"
import { checkJwt } from "../middleware/validateJWT"

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

userRouter.post("/", async function (req: Request, res: Response) {
    const { password } = req.body;
    req.body.password_hash = await hashPassword(password);
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    res.send(results);
})

userRouter.post("/login", async function (req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userRepository.findOneBy({username});
    if (!user) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }

    const passwordMatch = await comparePassword(user.password_hash, password);

    if (!passwordMatch){
        res.status(401).json({detail: "Unathorized"});
    }

    const token = jwt.sign(
        {username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN},
    )

    res.send({token});
})

userRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const results = await userRepository
        .createQueryBuilder("user")
        .select("user.username")
        .addSelect("user.email")
        .addSelect("user.profile_picture")
        .addSelect("user.bio")
        .getMany()
    res.json(results);
})

userRouter.get("/:username", [checkJwt], async function (req: Request, res: Response) {
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

userRouter.put("/:username", [checkJwt], async function (req: Request, res: Response) {
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

userRouter.delete("/:username", [checkJwt], async function (req: Request, res: Response) {
    const username = req.params.username;
    const results = await userRepository.delete(username)
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `User with username ${username} not found` });
        return;
    }
    res.send(results);
})

export default userRouter;
