import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Subscription } from '../models/Subscribtion';
import { SubscriptionController } from '../controllers/SubscriptionController';
import { authenticate } from '../middleware/authMiddleware';

const subscriptionRouter = Router();
const subscriptionRepository = AppDataSource.getRepository(Subscription);

// Create the subscription controller with the fields to expose in the API
const subscriptionController = new SubscriptionController(
    subscriptionRepository,
    ['id', 'subscriber', 'creator', 'createdAt']
);

// Get all subscriptions
subscriptionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await subscriptionController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a subscription by ID
subscriptionRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await subscriptionController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new subscription (requires authentication)
subscriptionRouter.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        // Set the subscriber to the authenticated user
        req.body.subscriber = { id: req.user.id };
        
        const result = await subscriptionController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a subscription (requires authentication)
subscriptionRouter.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if the user is the subscriber
        const subscription = await subscriptionRepository.findOne({
            where: { id },
            relations: ['subscriber']
        });
        
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        
        if (subscription.subscriber.id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own subscriptions' });
        }
        
        await subscriptionController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get subscriptions by subscriber ID (users that this user follows)
subscriptionRouter.get('/subscriber/:subscriberId', async (req: Request, res: Response) => {
    try {
        const subscriberId = parseInt(req.params.subscriberId);
        const result = await subscriptionController.getSubscriptionsBySubscriber(subscriberId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Get subscriptions by creator ID (users that follow this user)
subscriptionRouter.get('/creator/:creatorId', async (req: Request, res: Response) => {
    try {
        const creatorId = parseInt(req.params.creatorId);
        const result = await subscriptionController.getSubscriptionsByCreator(creatorId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Check if a user is subscribed to a creator
subscriptionRouter.get('/check/:subscriberId/:creatorId', async (req: Request, res: Response) => {
    try {
        const subscriberId = parseInt(req.params.subscriberId);
        const creatorId = parseInt(req.params.creatorId);
        const result = await subscriptionController.checkSubscription(subscriberId, creatorId);
        res.status(200).json({ subscribed: result });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default subscriptionRouter;