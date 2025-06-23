"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBuilding = exports.updateBuilding = exports.createBuilding = exports.getBuildingById = exports.getAllBuildings = void 0;
const database_1 = require("../config/database");
const Building_1 = require("../entities/Building");
const buildingRepository = database_1.AppDataSource.getRepository(Building_1.Building);
const getAllBuildings = async (req, res) => {
    try {
        const buildings = await buildingRepository.find({
            relations: ["Apartments"]
        });
        res.json(buildings);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error });
    }
};
exports.getAllBuildings = getAllBuildings;
const getBuildingById = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await buildingRepository.findOne({
            where: { BuildingID: parseInt(id) },
            relations: ["Apartments"]
        });
        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }
        res.json(building);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching building", error });
    }
};
exports.getBuildingById = getBuildingById;
const createBuilding = async (req, res) => {
    try {
        const { City, Street, Number, Type, Description, Photo } = req.body;
        const building = buildingRepository.create({
            City,
            Street,
            Number,
            Type,
            Description,
            Photo
        });
        const savedBuilding = await buildingRepository.save(building);
        res.status(201).json(savedBuilding);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating building", error });
    }
};
exports.createBuilding = createBuilding;
const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await buildingRepository.update(id, updateData);
        const updatedBuilding = await buildingRepository.findOne({
            where: { BuildingID: parseInt(id) },
            relations: ["Apartments"]
        });
        res.json(updatedBuilding);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating building", error });
    }
};
exports.updateBuilding = updateBuilding;
const deleteBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        await buildingRepository.delete(id);
        res.json({ message: "Building deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting building", error });
    }
};
exports.deleteBuilding = deleteBuilding;
//# sourceMappingURL=buildingController.js.map