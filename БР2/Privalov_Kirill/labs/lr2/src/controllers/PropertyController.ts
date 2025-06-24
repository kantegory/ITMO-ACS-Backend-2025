import { BaseController } from './BaseController';
import PropertyService from '../services/PropertyService';
import { Property } from '../entities/Property';

export const PropertyController = new BaseController<Property>(
  PropertyService.repo,
);

PropertyController.create = async (req, res) => {
  try {
    const saved = await PropertyService.create(req.payload, req.body);
    res.status(201).json(saved);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};

PropertyController.getAll = async (req, res) => {
  try {
    const list = await PropertyService.getAll(req.payload);
    res.status(200).json(list);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};

PropertyController.getById = async (req, res) => {
  try {
    const item = await PropertyService.getById(
      req.payload,
      Number(req.params.id),
    );
    res.status(200).json(item);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || (err.message === 'Property not found' ? 404 : 500))
      .json({ error: err.message || 'Internal server error' });
  }
};
