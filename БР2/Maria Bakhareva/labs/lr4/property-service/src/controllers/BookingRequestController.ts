import { BookingRequest } from '../entities/BookingRequest';
import BookingRequestService from '../services/BookingRequestService';
import { BaseController } from './BaseController';
import { Request, Response } from 'express';

export class BookingRequestController extends BaseController<BookingRequest> {
  constructor() {
    super(BookingRequestService.repo);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.payload) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const result = await BookingRequestService.create(req.body, req.payload);
      res.status(201).json(result);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await BookingRequestService.update(
        id,
        req.body,
        req.payload,
      );
      res.json(result);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 400)
        .json({ error: err.message || 'Update failed' });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const list = await BookingRequestService.getAll(req.payload);
      res.json(list);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Server error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const item = await BookingRequestService.getById(id, req.payload);
      if (!item) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(item);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Server error' });
    }
  };
}
