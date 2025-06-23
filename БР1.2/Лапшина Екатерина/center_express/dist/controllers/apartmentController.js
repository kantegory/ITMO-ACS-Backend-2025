"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApartment = exports.updateApartment = exports.createApartment = exports.getApartmentById = exports.getAllApartments = void 0;
const database_1 = require("../config/database");
const Apartment_1 = require("../entities/Apartment");
const apartmentRepository = database_1.AppDataSource.getRepository(Apartment_1.Apartment);
const getAllApartments = async (req, res) => {
    try {
        const apartments = await apartmentRepository.find({
            relations: ["Building"]
        });
        res.json(apartments);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching apartments", error });
    }
};
exports.getAllApartments = getAllApartments;
const getApartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await apartmentRepository.findOne({
            where: { ApartmentID: parseInt(id) },
            relations: ["Building"]
        });
        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }
        res.json(apartment);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching apartment", error });
    }
};
exports.getApartmentById = getApartmentById;
const createApartment = async (req, res) => {
    try {
        const { Number, Square, Description, Photo, Cost, BuildingID } = req.body;
        const apartment = apartmentRepository.create({
            Number,
            Square,
            Description,
            Photo,
            Cost,
            Building: BuildingID ? { BuildingID } : undefined
        });
        const savedApartment = await apartmentRepository.save(apartment);
        res.status(201).json(savedApartment);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating apartment", error });
    }
};
exports.createApartment = createApartment;
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.BuildingID) {
            updateData.Building = { BuildingID: updateData.BuildingID };
            delete updateData.BuildingID;
        }
        await apartmentRepository.update(id, updateData);
        const updatedApartment = await apartmentRepository.findOne({
            where: { ApartmentID: parseInt(id) },
            relations: ["Building"]
        });
        res.json(updatedApartment);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating apartment", error });
    }
};
exports.updateApartment = updateApartment;
const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;
        await apartmentRepository.delete(id);
        res.json({ message: "Apartment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting apartment", error });
    }
};
exports.deleteApartment = deleteApartment;
//# sourceMappingURL=apartmentController.js.map