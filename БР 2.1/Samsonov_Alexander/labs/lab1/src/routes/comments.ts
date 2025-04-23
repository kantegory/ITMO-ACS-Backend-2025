import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Comment } from '../models/Comment';
import { CommentController } from '../controllers/CommentController';
import { authenticate } from '../middleware/authMiddleware';

const commentRouter = Router();
const commentRepository = AppDataSource.getRepository(Comment);

// Create the comment controller with the fields to expose in the API
const commentController = new CommentController(
    commentRepository,
    ['id', 'content', 'user', 'recipe', 'createdAt']
);

// Get all comments
commentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await commentController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a comment by ID
commentRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await commentController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new comment (requires authentication)
commentRouter.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        // Set the user to the authenticated user
        req.body.user = { id: req.user.id };
        
        const result = await commentController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update a comment (requires authentication)
commentRouter.put('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the author of the comment
        const comment = await commentRepository.findOne({
            where: { id },
            relations: ['user']
        });
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        if (comment.user.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own comments' });
        }
        
        const result = await commentController.update(id, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a comment (requires authentication)
commentRouter.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the author of the comment
        const comment = await commentRepository.findOne({
            where: { id },
            relations: ['user']
        });
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        if (comment.user.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }
        
        await commentController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get comments by recipe ID
commentRouter.get('/recipe/:recipeId', async (req: Request, res: Response) => {
    try {
        const recipeId = parseInt(req.params.recipeId);
        const result = await commentController.getCommentsByRecipe(recipeId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Get comments by user ID
commentRouter.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await commentController.getCommentsByUser(userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default commentRouter;