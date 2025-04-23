import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Recipe } from '../models/Recipe';
import { RecipeController } from '../controllers/RecipeController';
import { authenticate } from '../middleware/authMiddleware';

const recipeRouter = Router();
const recipeRepository = AppDataSource.getRepository(Recipe);

// Create the recipe controller with the fields to expose in the API
const recipeController = new RecipeController(
    recipeRepository,
    ['id', 'title', 'description', 'ingredients', 'content', 'author', 'tags', 'createdAt', 'updatedAt']
);

// Get all recipes
recipeRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await recipeController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a recipe by ID
recipeRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await recipeController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new recipe (requires authentication)
recipeRouter.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        // Set the author to the authenticated user
        req.body.author = { id: req.user.id };
        
        const result = await recipeController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update a recipe (requires authentication)
recipeRouter.put('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the author of the recipe
        const recipe = await recipeRepository.findOne({
            where: { id },
            relations: ['author']
        });
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        if (recipe.author.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own recipes' });
        }
        
        const result = await recipeController.update(id, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a recipe (requires authentication)
recipeRouter.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the author of the recipe
        const recipe = await recipeRepository.findOne({
            where: { id },
            relations: ['author']
        });
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        if (recipe.author.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own recipes' });
        }
        
        await recipeController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get recipes by author ID
recipeRouter.get('/author/:authorId', async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.authorId);
        const result = await recipeController.getRecipesByAuthor(authorId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Get recipes by tag name
recipeRouter.get('/tag/:tagName', async (req: Request, res: Response) => {
    try {
        const result = await recipeController.getRecipesByTag(req.params.tagName);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default recipeRouter;