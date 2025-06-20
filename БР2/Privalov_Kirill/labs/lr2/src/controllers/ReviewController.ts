import { BaseController } from './BaseController';
import ReviewService from '../services/ReviewService';
import { Review } from '../entities/Review';

export const ReviewController = new BaseController<Review>(ReviewService.repo);

ReviewController.create = async (req, res) => {
  try {
    const { propertyId, rating, comment } = req.body;
    const review = await ReviewService.create(
      req.payload,
      propertyId,
      rating,
      comment,
    );
    res.status(201).json(review);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};

ReviewController.getAll = async (req, res) => {
  try {
    const pid = req.query.propertyId ? Number(req.query.propertyId) : undefined;
    const list = await ReviewService.getAll(pid);
    res.status(200).json(list);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};

ReviewController.getById = async (req, res) => {
  try {
    const review = await ReviewService.getById(Number(req.params.id));
    res.status(200).json(review);
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || (err.message === 'Review not found' ? 404 : 500))
      .json({ error: err.message || 'Internal server error' });
  }
};
