import { BaseController } from './BaseController';
import FavoriteService from '../services/FavoriteService';
import { Favorite } from '../entities/Favorite';
import { Request, Response } from 'express';

export class FavoriteController extends BaseController<Favorite> {
  constructor() {
    super(FavoriteService.repo);
  }

  create = async (req: Request, res: Response): Promise<void> => {
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

  getAll = async (req: Request, res: Response): Promise<void> => {
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
}

