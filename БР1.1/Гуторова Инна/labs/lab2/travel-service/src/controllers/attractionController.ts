import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Attraction from '../entities/Attraction';

export const createAttraction = async (req: Request, res: Response) => {
  try {
    const attractionRepository = AppDataSource.getRepository(Attraction);
    const newAttraction = attractionRepository.create(req.body);
    await attractionRepository.save(newAttraction);
    res.status(201).json(newAttraction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractions = async (req: Request, res: Response) => {
  try {
    const attractionRepository = AppDataSource.getRepository(Attraction);
    const attractions = await attractionRepository.find({ relations: ['route'] });
    res.json(attractions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractionById = async (req: Request, res: Response) => {
  try {
    const attractionRepository = AppDataSource.getRepository(Attraction);
    const attraction = await attractionRepository.findOne({
      where: { attraction_id: parseInt(req.params.id) },
      relations: ['route']
    });
    attraction ? res.json(attraction) : res.status(404).json({ message: 'Attraction not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAttraction = async (req: Request, res: Response): Promise<any> => {
  try {
    const attractionRepository = AppDataSource.getRepository(Attraction);
    const attraction = await attractionRepository.findOneBy({ attraction_id: parseInt(req.params.id) });
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    attractionRepository.merge(attraction, req.body);
    const result = await attractionRepository.save(attraction);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAttraction = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Attraction).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Attraction deleted' })
      : res.status(404).json({ message: 'Attraction not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};