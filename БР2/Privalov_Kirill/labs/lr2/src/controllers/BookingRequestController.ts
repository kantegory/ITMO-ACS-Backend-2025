import { BaseController } from './BaseController';
import { BookingRequest } from '../entities/BookingRequest';
import BookingRequestService from '../services/BookingRequestService';

export const BookingRequestController = new BaseController<BookingRequest>(
  BookingRequestService.repo,
);

BookingRequestController.create = async (req, res) => {
  try {
    const result = await BookingRequestService.create(req.body, req.payload);
    res.status(201).json(result);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};

BookingRequestController.update = async (req, res) => {
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

BookingRequestController.getAll = async (req, res) => {
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

BookingRequestController.getById = async (req, res) => {
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
