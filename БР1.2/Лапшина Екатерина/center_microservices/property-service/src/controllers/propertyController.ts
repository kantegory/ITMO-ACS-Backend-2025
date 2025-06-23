import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Building } from '../entities/Building';
import { Apartment } from '../entities/Apartment';

const buildingRepository = AppDataSource.getRepository(Building);
const apartmentRepository = AppDataSource.getRepository(Apartment);

// Building controllers
export const getBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await buildingRepository.find({
      relations: ['Apartments']
    });
    
    res.json({
      success: true,
      data: buildings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBuildingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const building = await buildingRepository.findOne({
      where: { BuildingID: parseInt(id) },
      relations: ['Apartments']
    });

    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }

    res.json({
      success: true,
      data: building
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBuilding = async (req: Request, res: Response) => {
  try {
    const { City, Street, Number, Type, Description, Photo } = req.body;
    
    const building = new Building();
    building.City = City;
    building.Street = Street;
    building.Number = Number;
    building.Type = Type;
    building.Description = Description;
    building.Photo = Photo;

    await buildingRepository.save(building);

    res.status(201).json({
      success: true,
      data: building
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Apartment controllers
export const getApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await apartmentRepository.find({
      relations: ['Building']
    });
    
    res.json({
      success: true,
      data: apartments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apartment = await apartmentRepository.findOne({
      where: { ApartmentID: parseInt(id) },
      relations: ['Building']
    });

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.json({
      success: true,
      data: apartment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createApartment = async (req: Request, res: Response) => {
  try {
    const { Number, Square, Description, Photo, Cost, BuildingID } = req.body;
    
    const building = await buildingRepository.findOne({
      where: { BuildingID: parseInt(BuildingID) }
    });

    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }

    const apartment = new Apartment();
    apartment.Number = Number;
    apartment.Square = Square;
    apartment.Description = Description;
    apartment.Photo = Photo;
    apartment.Cost = Cost;
    apartment.Building = building;

    await apartmentRepository.save(apartment);

    res.status(201).json({
      success: true,
      data: apartment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 