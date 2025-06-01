import { BaseController } from './BaseController';
import ComplaintService from '../services/ComplaintService';
import { Complaint } from '../entities/Complaint';
import { Request, Response } from 'express';

export class ComplaintController extends BaseController<Complaint> {
  constructor() {
    super(ComplaintService.repo);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const saved = await ComplaintService.create(
        req.payload,
        req.body.message,
        req.body.propertyId,
      );
      res.status(201).json(saved);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ message: err.message || 'Server error' });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const list = await ComplaintService.getAll(req.payload);
      res.json(list);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ message: err.message || 'Server error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await ComplaintService.getById(
        req.payload,
        Number(req.params.id),
      );
      res.json(item);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ message: err.message || 'Server error' });
    }
  };
}