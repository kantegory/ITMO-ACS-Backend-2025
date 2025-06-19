import { Request, Response } from "express";
import { blogPostRepository } from "../repositories/blogPost.repository";
import axios from "axios";

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author_id
 *       properties:
 *         post_id:
 *           type: integer
 *           description: The auto-generated ID of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         author_id:
 *           type: integer
 *           description: The ID of the user who created the post (references User Service)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the post
 */
export const BlogController = {
  /**
   * @swagger
   * /blog:
   *   post:
   *     summary: Create a new blog post
   *     tags: [Blog]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BlogPost'
   *     responses:
   *       201:
   *         description: The created blog post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogPost'
   *       400:
   *         description: Invalid input or user does not exist
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  create: async (req: Request, res: Response) => {
    try {
      const { title, content, author_id } = req.body;
      if (!title || !content || !author_id) {
        return res.status(400).json({ message: "Title, content, and author_id are required" });
      }

      // Verify user exists in User Service
      try {
        await axios.get(`${process.env.USER_SERVICE_URL}/users/find?user_id=${author_id}`, {
          headers: { Authorization: req.headers.authorization },
        });
      } catch (error) {
        return res.status(400).json({ message: "User with provided author_id does not exist" });
      }

      const blogPost = await blogPostRepository.save({ title, content, author_id });
      res.status(201).json(blogPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /**
   * @swagger
   * /blog:
   *   get:
   *     summary: Get all blog posts
   *     tags: [Blog]
   *     responses:
   *       200:
   *         description: List of all blog posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/BlogPost'
   *       500:
   *         description: Internal server error
   */
  getAll: async (_: Request, res: Response) => {
    try {
      const posts = await blogPostRepository.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */