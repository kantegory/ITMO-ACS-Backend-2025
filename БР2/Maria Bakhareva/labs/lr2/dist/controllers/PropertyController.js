"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Property_1 = require("../entities/Property");
const BaseController_1 = require("./BaseController");
exports.PropertyController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(Property_1.Property));
exports.PropertyController.getAll = async (req, res) => {
    try {
        const user = req.payload;
        const propertyRepo = databaseConfig_1.AppDataSource.getRepository(Property_1.Property);
        if (!user) {
            res.status(403).json({ error: 'User not authenticated' });
            return;
        }
        let properties;
        if (user.role === 'landlord') {
            properties = await propertyRepo.find({
                where: { owner: { id: user.userId } },
                relations: ['owner'],
            });
        }
        else {
            properties = await propertyRepo.find({ relations: ['owner'] });
        }
        res.status(200).json(properties);
    }
    catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.PropertyController.getById = async (req, res) => {
    try {
        const user = req.payload;
        const propertyId = req.params.id;
        const propertyRepo = databaseConfig_1.AppDataSource.getRepository(Property_1.Property);
        if (!user) {
            res.status(403).json({ error: 'User not authenticated' });
            return;
        }
        const property = await propertyRepo.findOne({
            where: { id: Number(propertyId) },
            relations: ['owner'],
        });
        if (!property) {
            res.status(404).json({ error: 'Property not found' });
            return;
        }
        if (user.role === 'landlord' && property.owner.id !== user.userId) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }
        res.status(200).json(property);
    }
    catch (error) {
        console.error('Error in getById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
