import { Request, Response } from "express";
import { postLikeRepository } from "../repositories/postLike.repository";
import { PostLike } from "../entities/PostLike";

/**
 * @swagger
 * components:
 *   schemas:
 *     PostLike:
 *       type: object
 *       required:
 *         - user_id
 *         - post_id
 *       properties:
 *         like_id:
 *           type: integer
 *           description: The auto-generated ID of the like
 *         user_id:
 *           type: integer
 *           description: The ID of the user who liked the post
 *         post_id:
 *           type: integer
 *           description: The ID of the blog post
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the like
 */
export const PostLikeController = {
  /**
   * @swagger
   * /like:
   *   post:
   *     summary: Create a new like
   *     tags: [PostLikes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostLike'
   *     responses:
   *       200:
   *         description: The created like
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostLike'
   */
  create: async (req: Request, res: Response) => {
    const like = await postLikeRepository.save(req.body);
    res.json(like);
  },

  /**
   * @swagger
   * /like:
   *   get:
   *     summary: Get all likes
   *     tags: [PostLikes]
   *     responses:
   *       200:
   *         description: List of all likes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PostLike'
   */
  getAll: async (_: Request, res: Response) => {
    const likes = await postLikeRepository.find();
    res.json(likes);
  },

  /**
   * @swagger
   * /like/{id}:
   *   get:
   *     summary: Get a like by ID
   *     tags: [PostLikes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like ID
   *     responses:
   *       200:
   *         description: The like
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostLike'
   *       404:
   *         description: Like not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const like = await postLikeRepository.findOneBy({ like_id: +req.params.id });
    if (!like) return res.status(404).json({ message: "Like not found" });
    res.json(like);
  },

  /**
   * @swagger
   * /like/{id}:
   *   put:
   *     summary: Update a like by ID
   *     tags: [PostLikes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostLike'
   *     responses:
   *       200:
   *         description: Like updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await postLikeRepository.update(req.params.id, req.body);
    res.json({ message: "Like updated" });
  },

  /**
   * @swagger
   * /like/{id}:
   *   delete:
   *     summary: Delete a like by ID
   *     tags: [PostLikes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like ID
   *     responses:
   *       200:
   *         description: Like deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await postLikeRepository.delete(req.params.id);
    res.json({ message: "Like deleted" });
  },
};