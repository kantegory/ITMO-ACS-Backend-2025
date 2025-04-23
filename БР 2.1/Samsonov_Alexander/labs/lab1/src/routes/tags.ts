import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Tag } from '../models/Tag';
import { TagController } from '../controllers/TagController';
import { authenticate } from '../middleware/authMiddleware';

const tagRouter = Router();
const tagRepository = AppDataSource.getRepository(Tag);

// Create the tag controller with the fields to expose in the API
const tagController = new TagController(
    tagRepository,
    ['id', 'name', 'recipes']
);

// Get all tags
tagRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await tagController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a tag by ID
tagRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await tagController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new tag (requires authentication)
tagRouter.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const result = await tagController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update a tag (requires authentication)
tagRouter.put('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await tagController.update(id, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tag (requires authentication)
tagRouter.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await tagController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get a tag by name
tagRouter.get('/name/:name', async (req: Request, res: Response) => {
    try {
        const result = await tagController.getTagByName(req.params.name);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default tagRouter;