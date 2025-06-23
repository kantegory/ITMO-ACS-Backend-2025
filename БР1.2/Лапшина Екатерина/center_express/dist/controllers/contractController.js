"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContract = exports.updateContract = exports.createContract = exports.getContractById = exports.getAllContracts = void 0;
const database_1 = require("../config/database");
const Contract_1 = require("../entities/Contract");
const contractRepository = database_1.AppDataSource.getRepository(Contract_1.Contract);
const getAllContracts = async (req, res) => {
    try {
        const contracts = await contractRepository.find({
            relations: ["AgentID", "ClientID", "ApartmentID"]
        });
        res.json(contracts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching contracts", error });
    }
};
exports.getAllContracts = getAllContracts;
const getContractById = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await contractRepository.findOne({
            where: { ContractID: parseInt(id) },
            relations: ["AgentID", "ClientID", "ApartmentID"]
        });
        if (!contract) {
            return res.status(404).json({ message: "Contract not found" });
        }
        res.json(contract);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching contract", error });
    }
};
exports.getContractById = getContractById;
const createContract = async (req, res) => {
    try {
        const { AgentID, ClientID, ApartmentID, Status, startDate, endDate } = req.body;
        const contract = contractRepository.create({
            AgentID,
            ClientID,
            ApartmentID,
            Status: Status || Contract_1.ContractStatus.PENDING,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined
        });
        const savedContract = await contractRepository.save(contract);
        res.status(201).json(savedContract);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating contract", error });
    }
};
exports.createContract = createContract;
const updateContract = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.AgentID) {
            updateData.AgentID = { UserID: updateData.AgentID };
        }
        if (updateData.ClientID) {
            updateData.ClientID = { UserID: updateData.ClientID };
        }
        if (updateData.ApartmentID) {
            updateData.ApartmentID = { ApartmentID: updateData.ApartmentID };
        }
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            updateData.endDate = new Date(updateData.endDate);
        }
        await contractRepository.update(id, updateData);
        const updatedContract = await contractRepository.findOne({
            where: { ContractID: parseInt(id) },
            relations: ["AgentID", "ClientID", "ApartmentID"]
        });
        res.json(updatedContract);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating contract", error });
    }
};
exports.updateContract = updateContract;
const deleteContract = async (req, res) => {
    try {
        const { id } = req.params;
        await contractRepository.delete(id);
        res.json({ message: "Contract deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting contract", error });
    }
};
exports.deleteContract = deleteContract;
//# sourceMappingURL=contractController.js.map