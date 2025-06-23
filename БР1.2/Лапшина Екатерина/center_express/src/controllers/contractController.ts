import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Contract, ContractStatus } from "../entities/Contract";

const contractRepository = AppDataSource.getRepository(Contract);

export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await contractRepository.find({
      relations: ["AgentID", "ClientID", "ApartmentID"]
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contracts", error });
  }
};

export const getContractById = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching contract", error });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const { AgentID, ClientID, ApartmentID, Status, startDate, endDate } = req.body;
    
    const contract = contractRepository.create({
      AgentID,
      ClientID,
      ApartmentID,
      Status: Status || ContractStatus.PENDING,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
    
    const savedContract = await contractRepository.save(contract);
    res.status(201).json(savedContract);
  } catch (error) {
    res.status(500).json({ message: "Error creating contract", error });
  }
};

export const updateContract = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ message: "Error updating contract", error });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await contractRepository.delete(id);
    res.json({ message: "Contract deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contract", error });
  }
}; 