import { Request, Response } from "express";
import { postCommentRepository } from "../repositories/postComment.repository";
import { PostComment } from "../entities/PostComment";

/**
 * @swagger
 * components:
 *   schemas:
 *     PostComment:
 *       type: object
 *       required:
 *         - content
 *         - user_id
 *         - post_id
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: The auto-generated ID of the comment
 *         user_id:
 *           type: integer
 *           description: The ID of the user who created the comment
 *         post_id:
 *           type: integer
 *           description: The ID of the blog post
 *         content:
 *           type: string
 *           description: The content of the comment
 *         video_url:
 *           type: string
 *           description: Optional video URL for the comment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The creation date of the comment
 */
export const PostCommentController = {
  /**
   * @swagger
   * /comment:
   *   post:
   *     summary: Create a new comment
   *     tags: [PostComments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostComment'
   *     responses:
   *       200:
   *         description: The created comment
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostComment'
   */
  create: async (req: Request, res: Response) => {
    const comment = await postCommentRepository.save(req.body);
    res.json(comment);
  },

  /**
   * @swagger
   * /comment:
   *   get:
   *     summary: Get all comments
   *     tags: [PostComments]
   *     responses:
   *       200:
   *         description: List of all comments
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PostComment'
   */
  getAll: async (_: Request, res: Response) => {
    const comments = await postCommentRepository.find();
    res.json(comments);
  },

  /**
   * @swagger
   * /comment/{id}:
   *   get:
   *     summary: Get a comment by ID
   *     tags: [PostComments]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The comment ID
   *     responses:
   *       200:
   *         description: The comment
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostComment'
   *       404:
   *         description: Comment not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const comment = await postCommentRepository.findOneBy({ comment_id: +req.params.id });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  },

  /**
   * @swagger
   * /comment/{id}:
   *   put:
   *     summary: Update a comment by ID
   *     tags: [PostComments]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The comment ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostComment'
   *     responses:
   *       200:
   *         description: Comment updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await postCommentRepository.update(req.params.id, req.body);
    res.json({ message: "Comment updated" });
  },

  /**
   * @swagger
   * /comment/{id}:
   *   delete:
   *     summary: Delete a comment by ID
   *     tags: [PostComments]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The comment ID
   *     responses:
   *       200:
   *         description: Comment deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await postCommentRepository.delete(req.params.id);
    res.json({ message: "Comment deleted" });
  },
};