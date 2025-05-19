import {dataSource} from "../config/dataSource";
import {BlogPost} from "../models/BlogPost";
import {RequestHandler} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";

const blogPostRepo = dataSource.getRepository(BlogPost);

class BlogPostController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const posts = await blogPostRepo.find();
            return res.json({posts});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    getOne: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
            if (!post) {
                return next(ApiError.badRequest(errorMessages.postNotFound));
            }
            return res.json({post});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    create: RequestHandler = async (req, res, next) => {
        const { title, content, authorId } = req.body;
        try {
            const newPost = blogPostRepo.create({ title, content, authorId });
            await blogPostRepo.save(newPost);
            return res.json({post: newPost});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    update: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
            if (!post) {
                return next(ApiError.badRequest(errorMessages.postNotFound));
            }
            post.title = title;
            post.content = content;
            await blogPostRepo.save(post);
            return res.json({post});
        } catch (e) {
            next(ApiError.internal());
        }
    }

    delete: RequestHandler = async (req, res, next) => {
        const { id } = req.params;
        try {
            const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
            if (!post) {
                return next(ApiError.badRequest(errorMessages.postNotFound));
            }
            await blogPostRepo.remove(post);
            return res.json({ message: 'Deleted successfully' });
        } catch (e) {
            next(ApiError.internal());
        }
    }
}

export default new BlogPostController();