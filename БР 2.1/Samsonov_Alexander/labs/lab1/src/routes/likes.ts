import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Like } from '../models/Like';
import { LikeController } from '../controllers/LikeController';
import { authenticate } from '../middleware/authMiddleware';

const likeRouter = Router();
const likeRepository = AppDataSource.getRepository(Like);

// Create the like controller with the fields to expose in the API
const likeController = new LikeController(
    likeRepository,
    ['id', 'user', 'recipe', 'createdAt']
);

// Get all likes
likeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await likeController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a like by ID
likeRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await likeController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new like (requires authentication)
likeRouter.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        // Set the user to the authenticated user
        req.body.user = { id: req.user.id };
        
        const result = await likeController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a like (requires authentication)
likeRouter.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the owner of the like
        const like = await likeRepository.findOne({
            where: { id },
            relations: ['user']
        });
        
        if (!like) {
            return res.status(404).json({ message: 'Like not found' });
        }
        
        if (like.user.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own likes' });
        }
        
        await likeController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get likes by recipe ID
likeRouter.get('/recipe/:recipeId', async (req: Request, res: Response) => {
    try {
        const recipeId = parseInt(req.params.recipeId);
        const result = await likeController.getLikesByRecipe(recipeId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Get likes by user ID
likeRouter.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await likeController.getLikesByUser(userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Check if a user has liked a recipe
likeRouter.get('/check/:userId/:recipeId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const recipeId = parseInt(req.params.recipeId);
        const result = await likeController.checkLike(userId, recipeId);
        res.status(200).json({ liked: result });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default likeRouter;