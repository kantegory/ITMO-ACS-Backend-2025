import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource"
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT"

const commentRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const commentRepository = dataSource.getRepository(Comment);

commentRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

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

commentRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const comments = await commentRepository.find();
    res.json(comments);
})

commentRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const commentId = parseInt(req.params.id);
    const results = await commentRepository.findOneBy({
        comment_id: commentId,
    });
    if (!results) {
        res.status(404).json({ detail: `Comment with id ${commentId} not found` });
        return;
    }
    res.send(results);
})

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
