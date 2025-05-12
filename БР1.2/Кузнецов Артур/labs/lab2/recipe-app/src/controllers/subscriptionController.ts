import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Subscription } from '../models/Subscription';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

const subscriptionRepository = AppDataSource.getRepository(Subscription);
const userRepository = AppDataSource.getRepository(User);

export const createSubscription = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const { followingId, followerId } = req.body;

    if (!Number.isInteger(followingId) || (followerId && !Number.isInteger(followerId))) {
        res.status(400).json({ message: 'Invalid followerId or followingId' });
        return;
    }

    const fid = actor.role === 'admin' && followerId ? followerId : actor.userId;

    if (fid === followingId) {
        res.status(400).json({ message: 'You can not subscribe to yourself' });
        return;
    }

    const follower = await userRepository.findOneBy({ id: fid });
    const following = await userRepository.findOneBy({ id: followingId });
    if (!follower || !following) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const sub = subscriptionRepository.create({ follower, following });
    const saved = await subscriptionRepository.save(sub);

    const result = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('subscription.id = :id', { id: saved.id })
    .getOne();

    res.status(201).json(result);
};

export const getFollowingOf = async function(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const list = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('follower.id = :userId', { userId })
    .getMany();

    res.json(list);
};

export const getFollowersOf = async function(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const list = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('following.id = :userId', { userId })
    .getMany();

    res.json(list);
};

export const getOwnFollowing = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const list = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('follower.id = :userId', { userId: actor.userId })
    .getMany();

    res.json(list);
};

export const getOwnFollowers = async function(req: AuthRequest, res: Response) {
    const actor = req.user!;
    const list = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('following.id = :userId', { userId: actor.userId })
    .getMany();

    res.json(list);
};

export const getSubscriptions = async function(_req: Request, res: Response) {
    const list = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .getMany();

    res.json(list);
};

export const getSubscription = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await subscriptionRepository
    .createQueryBuilder('subscription')
    .select([
        'subscription.id',
        'subscription.created_at',
        'follower.id',
        'follower.first_name',
        'follower.last_name',
        'following.id',
        'following.first_name',
        'following.last_name',
    ])
    .leftJoin('subscription.follower', 'follower')
    .leftJoin('subscription.following', 'following')
    .where('subscription.id = :id', { id })
    .getOne();

    if (!item) {
        res.status(404).json({ message: 'Subscription not found' });
        return;
    }
    res.json(item);
};

export const deleteSubscription = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await subscriptionRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Subscription not found' });
        return;
    }
    res.status(204).send();
};
