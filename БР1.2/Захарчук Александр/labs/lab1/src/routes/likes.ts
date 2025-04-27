import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource"
import { Like } from "../entities/Like";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const likeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const likeRepository = dataSource.getRepository(Like);

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
})

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
        .leftJoin("like.user", "user")
        .where("user.username = :username", {username: user.username})
        .getMany();
    res.json(likes);
})

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
})

export default likeRouter;
