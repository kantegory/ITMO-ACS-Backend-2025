import { BaseController } from './BaseController';
import ComplaintService from '../services/ComplaintService';
import { Complaint } from '../entities/Complaint';

export const ComplaintController = new BaseController<Complaint>(
  ComplaintService.repo,
);

ComplaintController.create = async (req, res) => {
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

ComplaintController.getAll = async (req, res) => {
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

ComplaintController.getById = async (req, res) => {
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
