import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Review from '../entities/Review';

export const createReview = async (req: Request, res: Response) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Review);
    const newReview = reviewRepository.create(req.body);
    await reviewRepository.save(newReview);
    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Review);
    const reviews = await reviewRepository.find({ relations: ['user', 'route'] });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOne({
      where: { review_id: parseInt(req.params.id) },
      relations: ['user', 'route']
    });
    review ? res.json(review) : res.status(404).json({ message: 'Review not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<any> => {
  try {
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOneBy({ review_id: parseInt(req.params.id) });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    reviewRepository.merge(review, req.body);
    const result = await reviewRepository.save(review);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Review).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Review deleted' })
      : res.status(404).json({ message: 'Review not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};