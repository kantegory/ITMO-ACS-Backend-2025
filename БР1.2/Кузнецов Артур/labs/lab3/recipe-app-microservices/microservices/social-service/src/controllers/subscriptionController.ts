import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Subscription } from '../models/Subscription';
import { AuthRequest } from 'common-service/src/middleware/authMiddleware';
import { userExists } from 'common-service/src/utils/checkExistence';

const subscriptionRepository = AppDataSource.getRepository(Subscription);

export const createSubscription = async (req: AuthRequest, res: Response) => {
    const actor = req.user!;
    const { followingId, followerId } = req.body;

    if (!Number.isInteger(followingId)) {
        res.status(400).json({ message: 'Invalid followingId' });
        return;
    }

    const actualFollowerId =
        actor.role === 'admin' && Number.isInteger(followerId)
            ? followerId
            : actor.userId;

    if (actualFollowerId === followingId) {
        res.status(400).json({ message: 'You cannot subscribe to yourself' });
        return;
    }

    const bothUsersExist = await Promise.all([
        userExists(actualFollowerId),
        userExists(followingId),
    ]);

    if (!bothUsersExist[0] || !bothUsersExist[1]) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const exists = await subscriptionRepository.findOneBy({
        followerId: actualFollowerId,
        followingId,
    });

    if (exists) {
        res.status(409).json({ message: 'Subscription already exists' });
        return;
    }

    const sub = subscriptionRepository.create({
        followerId: actualFollowerId,
        followingId,
    });

    const saved = await subscriptionRepository.save(sub);
    res.status(201).json(saved);
};

export const getFollowingOf = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    const list = await subscriptionRepository.find({
        where: { followerId: userId },
        order: { created_at: 'ASC' },
    });

    res.json(list);
};

export const getFollowersOf = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
    }

    const subs = await subscriptionRepository.find({
        where: { followingId: userId },
        order: { created_at: 'ASC' },
    });

    res.json(subs);
};

export const getOwnFollowing = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    const list = await subscriptionRepository.find({
        where: { followerId: userId },
        order: { created_at: 'ASC' },
    });

    res.json(list);
};

export const getOwnFollowers = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    const list = await subscriptionRepository.find({
        where: { followingId: userId },
        order: { created_at: 'ASC' },
    });

    res.json(list);
};

export const getSubscriptions = async (_req: Request, res: Response) => {
    const all = await subscriptionRepository.find({
        order: { created_at: 'ASC' },
    });
    res.json(all);
};

export const getSubscription = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    const item = await subscriptionRepository.findOneBy({ id });

    if (!item) {
        res.status(404).json({ message: 'Subscription not found' });
        return;
    }

    res.json(item);
};

export const deleteSubscription = async (req: AuthRequest, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
    }

    const actor = req.user!;
    const sub = await subscriptionRepository.findOneBy({ id });

    if (!sub) {
        res.status(404).json({ message: 'Subscription not found' });
        return;
    }

    if (actor.role !== 'admin' && sub.followerId !== actor.userId) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }

    await subscriptionRepository.delete({ id });
    res.status(204).send();
};
