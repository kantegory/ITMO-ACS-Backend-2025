import { BaseController } from './BaseController';
import FavoriteService from '../services/FavoriteService';
import { Favorite } from '../entities/Favorite';

export const FavoriteController = new BaseController<Favorite>(
  FavoriteService.repo,
);

FavoriteController.create = async (req, res) => {
  try {
    const saved = await FavoriteService.create(
      req.payload,
      req.body.propertyId,
    );
    res.status(201).json(saved);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error' });
  }
};

FavoriteController.getAll = async (req, res) => {
  try {
    const list = await FavoriteService.getAll(req.payload);
    res.status(200).json(list);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error' });
  }
};
