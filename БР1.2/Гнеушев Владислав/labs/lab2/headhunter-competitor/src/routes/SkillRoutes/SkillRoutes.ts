import express, { Request, Response, NextFunction } from 'express';
import { SkillController } from '../../controllers/skill.controller';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { CreateSkillDto, UpdateSkillDto } from './SkillSchemas';

const router = express.Router();
const skillController = new SkillController();

/**
 * @openapi
 * /api/skills:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get all skills
 *     responses:
 *       200:
 *         description: A list of skills.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SkillOutput'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const skills = await skillController.getAll();
        res.status(200).json(skills);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/skills/{id}:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get a skill by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the skill
 *     responses:
 *       200:
 *         description: Skill details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillOutput'
 *       400:
 *         description: Invalid skill ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Skill not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const skill = await skillController.getById(id);
        res.status(200).json(skill);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

/**
 * @openapi
 * /api/skills:
 *   post:
 *     tags:
 *       - Skills
 *     summary: Create a new skill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSkillDto'
 *     responses:
 *       201:
 *         description: Skill created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    '/',
    validationMiddleware(CreateSkillDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createDto = req.body as CreateSkillDto;
        try {
            const newSkill = await skillController.create(createDto);
            res.status(201).json(newSkill);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/skills/{id}:
 *   put:
 *     tags:
 *       - Skills
 *     summary: Update an existing skill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the skill to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSkillDto'
 *     responses:
 *       200:
 *         description: Skill updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillOutput'
 *       400:
 *         description: Invalid input (e.g., validation error, invalid ID format).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Skill not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
    '/:id',
    validationMiddleware(UpdateSkillDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateDto = req.body as UpdateSkillDto;
        try {
            const updatedSkill = await skillController.update(id, updateDto);
            res.status(200).json(updatedSkill);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/skills/{id}:
 *   delete:
 *     tags:
 *       - Skills
 *     summary: Delete a skill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the skill to delete
 *     responses:
 *       204:
 *         description: Skill deleted successfully.
 *       400:
 *         description: Invalid skill ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Skill not found for deletion.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await skillController.delete(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message, ...(error.details && { errors: error.details }) });
        } else {
            next(error);
        }
    }
});

export default router; 