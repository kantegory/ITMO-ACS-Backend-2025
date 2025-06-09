import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Route from '../entities/Route';

export const createRoute = async (req: Request, res: Response) => {
  try {
    const routeRepository = AppDataSource.getRepository(Route);
    const newRoute = routeRepository.create(req.body);
    await routeRepository.save(newRoute);
    res.status(201).json(newRoute);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const routeRepository = AppDataSource.getRepository(Route);
    const routes = await routeRepository.find({ relations: ['travel_type'] });
    res.json(routes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRouteById = async (req: Request, res: Response) => {
  try {
    const routeRepository = AppDataSource.getRepository(Route);
    const route = await routeRepository.findOne({
      where: { route_id: parseInt(req.params.id) },
      relations: ['travel_type', 'attractions']
    });
    route ? res.json(route) : res.status(404).json({ message: 'Route not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoute = async (req: Request, res: Response): Promise<any> => {
  try {
    const routeRepository = AppDataSource.getRepository(Route);
    const route = await routeRepository.findOneBy({ route_id: parseInt(req.params.id) });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    routeRepository.merge(route, req.body);
    const result = await routeRepository.save(route);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Route).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Route deleted' })
      : res.status(404).json({ message: 'Route not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};