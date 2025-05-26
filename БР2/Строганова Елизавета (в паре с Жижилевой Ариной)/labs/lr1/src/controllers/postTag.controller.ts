import { Request, Response } from "express";
import { postTagRepository } from "../repositories/postTag.repository";
import { PostTag } from "../entities/PostTag";

/**
 * @swagger
 * components:
 *   schemas:
 *     PostTag:
 *       type: object
 *       required:
 *         - name
 *         - post_id
 *       properties:
 *         posttag_id:
 *           type: integer
 *           description: The auto-generated ID of the tag
 *         post_id:
 *           type: integer
 *           description: The ID of the blog post
 *         name:
 *           type: string
 *           description: The name of the tag
 */
export const PostTagController = {
  /**
   * @swagger
   * /tag:
   *   post:
   *     summary: Create a new tag
   *     tags: [PostTags]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostTag'
   *     responses:
   *       200:
   *         description: The created tag
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostTag'
   */
  create: async (req: Request, res: Response) => {
    const tag = await postTagRepository.save(req.body);
    res.json(tag);
  },

  /**
   * @swagger
   * /tag:
   *   get:
   *     summary: Get all tags
   *     tags: [PostTags]
   *     responses:
   *       200:
   *         description: List of all tags
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PostTag'
   */
  getAll: async (_: Request, res: Response) => {
    const tags = await postTagRepository.find();
    res.json(tags);
  },

  /**
   * @swagger
   * /tag/{id}:
   *   get:
   *     summary: Get a tag by ID
   *     tags: [PostTags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag ID
   *     responses:
   *       200:
   *         description: The tag
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PostTag'
   *       404:
   *         description: Tag not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  getById: async (req: Request, res: Response) => {
    const tag = await postTagRepository.findOneBy({ posttag_id: +req.params.id });
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  },

  /**
   * @swagger
   * /tag/{id}:
   *   put:
   *     summary: Update a tag by ID
   *     tags: [PostTags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostTag'
   *     responses:
   *       200:
   *         description: Tag updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  update: async (req: Request, res: Response) => {
    await postTagRepository.update(req.params.id, req.body);
    res.json({ message: "Tag updated" });
  },

  /**
   * @swagger
   * /tag/{id}:
   *   delete:
   *     summary: Delete a tag by ID
   *     tags: [PostTags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag ID
   *     responses:
   *       200:
   *         description: Tag deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  delete: async (req: Request, res: Response) => {
    await postTagRepository.delete(req.params.id);
    res.json({ message: "Tag deleted" });
  },
};