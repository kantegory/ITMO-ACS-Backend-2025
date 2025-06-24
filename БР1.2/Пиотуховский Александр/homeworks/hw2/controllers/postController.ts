import { RequestHandler } from 'express';
import * as postService from '../services/postService';
import { toPostResponseDTO } from '../utils/post.mapper';
import {CreatePostDTO, UpdatePostDTO} from "../dtos/post.dto";

export const listPostsController: RequestHandler = async (
    _req,
    res,
    next
): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts.map(toPostResponseDTO));
    } catch (err) {
        next(err);
    }
};

export const getPostController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const post = await postService.getPostById(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(toPostResponseDTO(post));
    } catch (err) {
        next(err);
    }
};

export const createPostController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const data = req.body as CreatePostDTO;
        const newPost = await postService.createPost(data);
        res.status(201).json(toPostResponseDTO(newPost));
    } catch (err) {
        if (err instanceof Error) {
            const msg = err.message;
            if (msg === 'Author not found' || msg.startsWith('Recipe not found')) {
                res.status(404).json({ message: msg });
                return;
            }
        }
        next(err);
    }
};

export const updatePostController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const updates = req.body as UpdatePostDTO;
        const updated = await postService.updatePost(id, updates);
        if (!updated) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(toPostResponseDTO(updated));
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Recipe not found')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const deletePostController: RequestHandler = async (
    req,
    res,
    next
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deleted = await postService.deletePost(id);
        if (!deleted) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


export const addFavoriteController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const postId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await postService.setPostFavorite(userId, postId, true);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Post not found')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const removeFavoriteController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const postId = Number(req.params.id);
        const userId = Number(req.body.userId);
        await postService.setPostFavorite(userId, postId, false);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Post not found')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};