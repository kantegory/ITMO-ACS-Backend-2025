import { Router } from 'express';
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
} from '../controllers/reviewController';

const reviewRouter = Router();

reviewRouter.post('/', createReview);
reviewRouter.get('/', getReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;