"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.updateSubscription = exports.getSubscription = exports.getSubscriptions = exports.createSubscription = void 0;
const AppDataSource_1 = require("../config/AppDataSource");
const Subscriptions_1 = require("../models/Subscriptions");
const Users_1 = require("../models/Users");
const subscriptionRepository = AppDataSource_1.AppDataSource.getRepository(Subscriptions_1.Subscriptions);
const userRepository = AppDataSource_1.AppDataSource.getRepository(Users_1.Users);
// Создание новой подписки
const createSubscription = async function (req, res) {
    try {
        const { followerId, followingId } = req.body;
        const follower = await userRepository.findOneBy({ id: followerId });
        const following = await userRepository.findOneBy({ id: followingId });
        if (!follower || !following) {
            return res.status(404).json({ message: "Follower or following user not found" });
        }
        const subscription = subscriptionRepository.create({ follower, following });
        const savedSubscription = await subscriptionRepository.save(subscription);
        res.status(201).json(savedSubscription);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createSubscription = createSubscription;
// Получение всех подписок
const getSubscriptions = async function (_req, res) {
    try {
        const subscriptions = await subscriptionRepository.find({
            relations: ["follower", "following"],
        });
        res.json(subscriptions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSubscriptions = getSubscriptions;
// Получение одной подписки по id
const getSubscription = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const subscription = await subscriptionRepository.findOne({
            where: { id: id },
            relations: ["follower", "following"],
        });
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.json(subscription);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSubscription = getSubscription;
// Обновление подписки
const updateSubscription = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        if (updatedData.followerId) {
            const follower = await userRepository.findOneBy({ id: updatedData.followerId });
            if (!follower) {
                return res.status(404).json({ message: "Follower not found" });
            }
            updatedData.follower = follower;
        }
        if (updatedData.followingId) {
            const following = await userRepository.findOneBy({ id: updatedData.followingId });
            if (!following) {
                return res.status(404).json({ message: "Following user not found" });
            }
            updatedData.following = following;
        }
        const result = await subscriptionRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.json({ message: "Subscription updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSubscription = updateSubscription;
// Удаление подписки
const deleteSubscription = async function (req, res) {
    try {
        const id = Number(req.params.id);
        const result = await subscriptionRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSubscription = deleteSubscription;
