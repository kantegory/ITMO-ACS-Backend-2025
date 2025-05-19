import { RequestHandler } from 'express';
import * as userService from '../services/userService';
import * as postService from '../services/postService';
import * as recipeService from '../services/recipeService';
import { toUserResponseDTO } from '../utils/user.mapper';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { ValidationException } from '../utils/validation';
import {updateUser} from "../services/userService";
import {toPostResponseDTO} from "../utils/post.mapper";
import {toRecipeResponseDTO} from "../utils/recipe.mapper";

export const listUsersController: RequestHandler = async (_req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users.map(toUserResponseDTO));
        return;
    } catch (err) {
        next(err);
    }
};

export const getUserController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const user = await userService.findUser({ id });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(toUserResponseDTO(user));
    } catch (err) {
        next(err);
    }
};

export const findUserController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id, email } = req.body as { id?: number; email?: string };
        if (id == null && !email) {
            res.status(400).json({ message: 'Either id or email must be provided' });
            return;
        }
        const user = await userService.findUser({ id, email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(toUserResponseDTO(user));
        return;
    } catch (err) {
        next(err);
    }
};

export const getUserFavoritesPostsController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const posts = await postService.getUserFavoritePosts(id);
        res.json(posts.map(toPostResponseDTO));
    } catch (err) {
        if (err instanceof Error && err.message === 'User not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const getUserFavoritesRecipesController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const recipes = await recipeService.getUserFavoriteRecipes(id);
        res.json(recipes.map(toRecipeResponseDTO));
    } catch (err) {
        if (err instanceof Error && err.message === 'User not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const createUserController: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body as CreateUserDTO;
        const newUser = await userService.createUser(data);
        res.status(201).json(toUserResponseDTO(newUser));
        return;
    } catch (err) {
        if (err instanceof ValidationException) {
            res.status(err.statusCode).json({ errors: err.errors });
            return;
        }
        next(err);
    }
};

export const updateUserController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;

        const updated = await updateUser(id, updates);
        if (!updated) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(toUserResponseDTO(updated));
        return;
    } catch (err) {
        if (err instanceof ValidationException) {
            res.status(err.statusCode).json({ errors: err.errors });
            return;
        }
        next(err);
    }
};

export const deleteUserController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(204).send();
        return;
    } catch (err) {
        next(err);
    }
};

export const subscribeController: RequestHandler = async (req, res, next) => {
    try {
        const targetId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await userService.setUserSubscription(userId, targetId, true);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Target user not found' || err.message === 'Cannot subscribe to self')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const unsubscribeController: RequestHandler = async (req, res, next) => {
    try {
        const targetId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await userService.setUserSubscription(userId, targetId, false);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Target user not found' || err.message === 'Cannot subscribe to self')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const getUserFollowersController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const users = await userService.getFollowers(id);
        res.json(users.map(toUserResponseDTO));
        return;
    } catch (err) {
        if (err instanceof Error && err.message === 'User not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};


export const getUserFollowingController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const users = await userService.getFollowing(id);
        res.json(users.map(toUserResponseDTO));
        return;
    } catch (err) {
        if (err instanceof Error && err.message === 'User not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};