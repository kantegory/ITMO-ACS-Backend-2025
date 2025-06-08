"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Favorite_1 = require("../entities/Favorite");
const User_1 = require("../entities/User");
const BaseController_1 = require("./BaseController");
exports.FavoriteController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(Favorite_1.Favorite));
exports.FavoriteController.getAll = async (req, res) => {
    try {
        if (req.payload) {
            if (req.payload.role === User_1.UserRole.ADMIN) {
                const favorites = await exports.FavoriteController.repository.find();
                res.status(200).json(favorites);
            }
            const favorites = await exports.FavoriteController.repository.find({
                where: { user: { id: req.payload.userId } },
            });
            res.status(200).json(favorites);
        }
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.FavoriteController.getById = async (req, res) => {
    try {
        if (req.payload) {
            if (req.payload.role === User_1.UserRole.ADMIN) {
                const favorite = await exports.FavoriteController.repository.findOne({
                    where: { id: Number(req.params.id) },
                });
                res.status(200).json(favorite);
                return;
            }
            else {
                const favorite = await exports.FavoriteController.repository.findOne({
                    where: {
                        id: Number(req.params.id),
                        user: { id: req.payload.userId },
                    },
                });
                res.status(200).json(favorite);
                return;
            }
        }
        res.status(403).json({ message: 'Forbidden' });
    }
    catch (error) {
        console.error('Error fetching favorite:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
