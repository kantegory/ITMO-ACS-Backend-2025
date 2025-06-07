import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import TravelType from '../entities/TravelType';

export const createTravelType = async (req: Request, res: Response) => {
  try {
    const travelTypeRepository = AppDataSource.getRepository(TravelType);
    const newTravelType = travelTypeRepository.create(req.body);
    await travelTypeRepository.save(newTravelType);
    res.status(201).json(newTravelType);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTravelTypes = async (req: Request, res: Response) => {
  try {
    const travelTypeRepository = AppDataSource.getRepository(TravelType);
    const travelTypes = await travelTypeRepository.find({ relations: ['routes'] });
    res.json(travelTypes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTravelTypeById = async (req: Request, res: Response) => {
  try {
    const travelTypeRepository = AppDataSource.getRepository(TravelType);
    const travelType = await travelTypeRepository.findOne({
      where: { travel_type_id: parseInt(req.params.id) },
      relations: ['routes']
    });
    travelType ? res.json(travelType) : res.status(404).json({ message: 'Travel type not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTravelType = async (req: Request, res: Response): Promise<any> => {
  try {
    const travelTypeRepository = AppDataSource.getRepository(TravelType);
    const travelType = await travelTypeRepository.findOneBy({ travel_type_id: parseInt(req.params.id) });
    if (!travelType) return res.status(404).json({ message: 'Travel type not found' });
    travelTypeRepository.merge(travelType, req.body);
    const result = await travelTypeRepository.save(travelType);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTravelType = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(TravelType).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Travel type deleted' })
      : res.status(404).json({ message: 'Travel type not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};