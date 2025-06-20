import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Trip from '../entities/Trip';

export const createTrip = async (req: Request, res: Response) => {
  try {
    const tripRepository = AppDataSource.getRepository(Trip);
    const newTrip = tripRepository.create(req.body);
    await tripRepository.save(newTrip);
    res.status(201).json(newTrip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrips = async (req: Request, res: Response) => {
  try {
    const tripRepository = AppDataSource.getRepository(Trip);
    const trips = await tripRepository.find({ relations: ['route'] });
    res.json(trips);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const tripRepository = AppDataSource.getRepository(Trip);
    const trip = await tripRepository.findOne({
      where: { trip_id: parseInt(req.params.id) },
      relations: ['route']
    });
    trip ? res.json(trip) : res.status(404).json({ message: 'Trip not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTrip = async (req: Request, res: Response): Promise<any> => {
  try {
    const tripRepository = AppDataSource.getRepository(Trip);
    const trip = await tripRepository.findOneBy({ trip_id: parseInt(req.params.id) });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    tripRepository.merge(trip, req.body);
    const result = await tripRepository.save(trip);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Trip).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Trip deleted' })
      : res.status(404).json({ message: 'Trip not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};