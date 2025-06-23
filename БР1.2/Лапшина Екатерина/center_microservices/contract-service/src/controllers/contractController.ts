import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Contract } from '../entities/Contract';
import { ContractStatus } from '../types';
import { UserService } from '../services/userService';
import { PropertyService } from '../services/propertyService';

const contractRepository = AppDataSource.getRepository(Contract);
const userService = new UserService();
const propertyService = new PropertyService();

export const getContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await contractRepository.find();
    
    // Enrich contracts with user and apartment data
    const enrichedContracts = await Promise.all(
      contracts.map(async (contract) => {
        const agent = await userService.getUserById(contract.AgentID);
        const client = await userService.getUserById(contract.ClientID);
        const apartment = await propertyService.getApartmentById(contract.ApartmentID);

        return {
          ...contract,
          agent,
          client,
          apartment
        };
      })
    );

    res.json({
      success: true,
      data: enrichedContracts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contract = await contractRepository.findOne({
      where: { ContractID: parseInt(id) }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Enrich contract with user and apartment data
    const agent = await userService.getUserById(contract.AgentID);
    const client = await userService.getUserById(contract.ClientID);
    const apartment = await propertyService.getApartmentById(contract.ApartmentID);

    const enrichedContract = {
      ...contract,
      agent,
      client,
      apartment
    };

    res.json({
      success: true,
      data: enrichedContract
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const { AgentID, ClientID, ApartmentID, startDate, endDate } = req.body;

    // Validate that users and apartment exist
    const agent = await userService.getUserById(AgentID);
    const client = await userService.getUserById(ClientID);
    const apartment = await propertyService.getApartmentById(ApartmentID);

    if (!agent || !client || !apartment) {
      return res.status(400).json({ message: 'Invalid agent, client, or apartment' });
    }

    const contract = new Contract();
    contract.AgentID = AgentID;
    contract.ClientID = ClientID;
    contract.ApartmentID = ApartmentID;
    contract.Status = ContractStatus.PENDING;
    contract.startDate = startDate ? new Date(startDate) : null;
    contract.endDate = endDate ? new Date(endDate) : null;

    await contractRepository.save(contract);

    res.status(201).json({
      success: true,
      data: contract
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateContractStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Status } = req.body;

    const contract = await contractRepository.findOne({
      where: { ContractID: parseInt(id) }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    contract.Status = Status;
    await contractRepository.save(contract);

    res.json({
      success: true,
      data: contract
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 