import { AppDataSource } from '../config/databaseConfig';
import { Favorite } from '../entities/Favorite';
import { UserRole } from '../entities/User';
import { BaseController } from './BaseController';

export const FavoriteController = new BaseController(
  AppDataSource.getRepository(Favorite),
);

FavoriteController.getAll = async (req, res) => {
  try {
    if (req.payload) {
      if (req.payload.role === UserRole.ADMIN) {
        const favorites = await FavoriteController.repository.find();
        res.status(200).json(favorites);
      }
      const favorites = await FavoriteController.repository.find({
        where: { user: { id: req.payload.userId } },
      });
      res.status(200).json(favorites);
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

FavoriteController.getById = async (req, res) => {
  try {
    if (req.payload) {
      if (req.payload.role === UserRole.ADMIN) {
        const favorite = await FavoriteController.repository.findOne({
          where: { id: Number(req.params.id) },
        });
        res.status(200).json(favorite);
        return;
      } else {
        const favorite = await FavoriteController.repository.findOne({
          where: {
            id: Number(req.params.id),
            user: { id: req.payload.userId },
          },
        });
        res.status(200).json(favorite);
        return;
      }
    }
    res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    console.error('Error fetching favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
