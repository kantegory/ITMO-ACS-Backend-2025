"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPosts = exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const createPost = async (req, res) => {
    const post = new BlogPost_1.default(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
};
exports.createPost = createPost;
const getPost = async (req, res) => {
    const post = await BlogPost_1.default.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};
exports.getPost = getPost;
const updatePost = async (req, res) => {
    const updated = await BlogPost_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    await BlogPost_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deletePost = deletePost;
const listPosts = async (_, res) => {
    const posts = await BlogPost_1.default.find();
    res.json(posts);
};
exports.listPosts = listPosts;
