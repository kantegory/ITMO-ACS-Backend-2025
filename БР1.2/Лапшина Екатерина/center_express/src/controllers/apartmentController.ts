import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Apartment } from "../entities/Apartment";
import { Building } from "../entities/Building";

const apartmentRepository = AppDataSource.getRepository(Apartment);
const buildingRepository = AppDataSource.getRepository(Building);

export const getAllApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await apartmentRepository.find({
      relations: ["Building"]
    });
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartments", error });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartment", error });
  }
};

export const createApartment = async (req: Request, res: Response) => {
  try {
    const { Number, Square, Description, Photo, Cost, BuildingID } = req.body;
    
    // Проверяем существование здания, если указан BuildingID
    if (BuildingID) {
      const building = await buildingRepository.findOne({
        where: { BuildingID: parseInt(BuildingID) }
      });
      
      if (!building) {
        return res.status(400).json({ 
          message: "Building not found", 
          error: `Building with ID ${BuildingID} does not exist` 
        });
      }
    }
    
    const apartment = apartmentRepository.create({
      Number,
      Square,
      Description,
      Photo,
      Cost,
      Building: BuildingID ? { BuildingID: parseInt(BuildingID) } : undefined
    });
    
    const savedApartment = await apartmentRepository.save(apartment);
    
    // Возвращаем созданную квартиру с данными здания
    const apartmentWithBuilding = await apartmentRepository.findOne({
      where: { ApartmentID: savedApartment.ApartmentID },
      relations: ["Building"]
    });
    
    res.status(201).json(apartmentWithBuilding);
  } catch (error) {
    res.status(500).json({ message: "Error creating apartment", error });
  }
};

export const updateApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Проверяем существование здания, если указан BuildingID
    if (updateData.BuildingID) {
      const building = await buildingRepository.findOne({
        where: { BuildingID: parseInt(updateData.BuildingID) }
      });
      
      if (!building) {
        return res.status(400).json({ 
          message: "Building not found", 
          error: `Building with ID ${updateData.BuildingID} does not exist` 
        });
      }
      
      updateData.Building = { BuildingID: parseInt(updateData.BuildingID) };
      delete updateData.BuildingID;
    }
    
    await apartmentRepository.update(id, updateData);
    const updatedApartment = await apartmentRepository.findOne({
      where: { ApartmentID: parseInt(id) },
      relations: ["Building"]
    });
    
    res.json(updatedApartment);
  } catch (error) {
    res.status(500).json({ message: "Error updating apartment", error });
  }
};

export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await apartmentRepository.delete(id);
    res.json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting apartment", error });
  }
}; 