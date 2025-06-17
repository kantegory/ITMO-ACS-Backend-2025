"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogPostController_1 = require("../controllers/BlogPostController");
const blogPostRouter = (0, express_1.Router)();
blogPostRouter.get('/', BlogPostController_1.getBlogPosts);
blogPostRouter.get('/:id', (req, res, next) => {
    (0, BlogPostController_1.getBlogPostById)(req, res).catch(next);
});
blogPostRouter.post('/', BlogPostController_1.createBlogPost);
blogPostRouter.put('/:id', BlogPostController_1.updateBlogPost);
blogPostRouter.delete('/:id', BlogPostController_1.deleteBlogPost);
exports.default = blogPostRouter;
