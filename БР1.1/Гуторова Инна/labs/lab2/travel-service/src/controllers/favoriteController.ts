import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Favorite from '../entities/Favorite';

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const newFavorite = favoriteRepository.create(req.body);
    await favoriteRepository.save(newFavorite);
    res.status(201).json(newFavorite);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const favorites = await favoriteRepository.find({ relations: ['user', 'route'] });
    res.json(favorites);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const favorite = await favoriteRepository.findOne({
      where: { favorite_id: parseInt(req.params.id) },
      relations: ['user', 'route']
    });
    favorite ? res.json(favorite) : res.status(404).json({ message: 'Favorite not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Favorite).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Favorite deleted' })
      : res.status(404).json({ message: 'Favorite not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};