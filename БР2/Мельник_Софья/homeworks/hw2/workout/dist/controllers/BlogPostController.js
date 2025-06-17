"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostById = exports.getBlogPosts = void 0;
const app_data_source_1 = require("../config/app-data-source");
const BlogPost_1 = require("../entities/BlogPost");
const blogPostRepository = app_data_source_1.AppDataSource.getRepository(BlogPost_1.BlogPost);
const getBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield blogPostRepository.find();
    res.json(posts);
});
exports.getBlogPosts = getBlogPosts;
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield blogPostRepository.findOneBy({ id: Number(id) });
    if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
});
exports.getBlogPostById = getBlogPostById;
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = blogPostRepository.create(req.body);
    const result = yield blogPostRepository.save(newPost);
    res.status(201).json(result);
});
exports.createBlogPost = createBlogPost;
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield blogPostRepository.update(id, req.body);
    res.json({ message: 'Blog post updated' });
});
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield blogPostRepository.delete(id);
    res.json({ message: 'Blog post deleted' });
});
exports.deleteBlogPost = deleteBlogPost;
