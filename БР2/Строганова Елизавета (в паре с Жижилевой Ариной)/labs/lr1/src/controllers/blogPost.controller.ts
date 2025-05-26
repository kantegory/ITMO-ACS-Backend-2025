import { Request, Response } from "express";
import { blogPostRepository } from "../repositories/blogPost.repository";
import { BlogPost } from "../entities/BlogPost";

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *         - user_id
 *       properties:
 *         post_id:
 *           type: integer
 *           description: The auto-generated ID of the blog post
 *         user_id:
 *           type: integer
 *           description: The ID of the user who created the post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         category:
 *           type: string
 *           description: The category of the blog post
 *         date:
 *           type: string
 *           format: date-time
 *           description: The creation date of the post
 */
export const BlogPostController = {
  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Create a new blog post
   *     tags: [BlogPosts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BlogPost'
   *     responses:
   *       200:
   *         description: The created blog post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogPost'
   */
  create: async (req: Request, res: Response) => {
    const post = await blogPostRepository.save(req.body);
    res.json(post);
  },

  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Get all blog posts
   *     tags: [BlogPosts]
   *     responses:
   *       200:
   *         description: List of all blog posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/BlogPost'
   */
  getAll: async (_: Request, res: Response) => {
    const posts = await blogPostRepository.find();
    res.json(posts);
  },

  /**
   * @swagger
   * /posts/{id}:
   *   get:
   *     summary: Get a blog post by ID
   *     tags: [BlogPosts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog post ID
   *     responses:
   *       200:
   *         description: The blog post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogPost'
   *       404:
   *         description: Post not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const post = await blogPostRepository.findOneBy({ post_id: +req.params.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  },

  /**
   * @swagger
   * /posts/{id}:
   *   put:
   *     summary: Update a blog post by ID
   *     tags: [BlogPosts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog post ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BlogPost'
   *     responses:
   *       200:
   *         description: Blog post updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await blogPostRepository.update(req.params.id, req.body);
    res.json({ message: "Post updated" });
  },

  /**
   * @swagger
   * /posts/{id}:
   *   delete:
   *     summary: Delete a blog post by ID
   *     tags: [BlogPosts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog post ID
   *     responses:
   *       200:
   *         description: Blog post deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await blogPostRepository.delete(req.params.id);
    res.json({ message: "Post deleted" });
  },
};