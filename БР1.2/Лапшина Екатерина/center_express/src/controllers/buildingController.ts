import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Building } from "../entities/Building";

const buildingRepository = AppDataSource.getRepository(Building);

export const getAllBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await buildingRepository.find({
      relations: ["Apartments"]
    });
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buildings", error });
  }
};

export const getBuildingById = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching building", error });
  }
};

export const createBuilding = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ message: "Error creating building", error });
  }
};

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    await buildingRepository.update(id, updateData);
    const updatedBuilding = await buildingRepository.findOne({
      where: { BuildingID: parseInt(id) },
      relations: ["Apartments"]
    });
    
    res.json(updatedBuilding);
  } catch (error) {
    res.status(500).json({ message: "Error updating building", error });
  }
};

export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await buildingRepository.delete(id);
    res.json({ message: "Building deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting building", error });
  }
}; 