import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Subscriptions } from "../models/Subscriptions";
import { Users } from "../models/Users";

const subscriptionRepository = AppDataSource.getRepository(Subscriptions);
const userRepository = AppDataSource.getRepository(Users);

// Создание новой подписки
export const createSubscription = async function (req: Request, res: Response) {
    try {
        const {followerId, followingId} = req.body;

        const follower = await userRepository.findOneBy({id: followerId});
        const following = await userRepository.findOneBy({id: followingId});
        if (!follower || !following) {
            return res.status(404).json({message: "Follower or following user not found"});
        }

        const subscription = subscriptionRepository.create({follower, following});
        const savedSubscription = await subscriptionRepository.save(subscription);
        res.status(201).json(savedSubscription);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех подписок
export const getSubscriptions = async function (_req: Request, res: Response) {
    try {
        const subscriptions = await subscriptionRepository.find({
            relations: ["follower", "following"],
        });
        res.json(subscriptions);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одной подписки по id
export const getSubscription = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const subscription = await subscriptionRepository.findOne({
            where: {id: id},
            relations: ["follower", "following"],
        });
        if (!subscription) {
            return res.status(404).json({message: "Subscription not found"});
        }
        res.json(subscription);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление подписки
export const updateSubscription = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;

        if (updatedData.followerId) {
            const follower = await userRepository.findOneBy({id: updatedData.followerId});
            if (!follower) {
                return res.status(404).json({message: "Follower not found"});
            }
            updatedData.follower = follower;
        }
        if (updatedData.followingId) {
            const following = await userRepository.findOneBy({id: updatedData.followingId});
            if (!following) {
                return res.status(404).json({message: "Following user not found"});
            }
            updatedData.following = following;
        }

        const result = await subscriptionRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Subscription not found"});
        }
        res.json({message: "Subscription updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление подписки
export const deleteSubscription = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await subscriptionRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Subscription not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
