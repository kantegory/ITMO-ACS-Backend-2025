import { AppDataSource } from '../config/databaseConfig';
import { Review } from '../entities/Review';
import { BookingRequest } from '../entities/BookingRequest';
import { BaseController } from './BaseController';

export const ReviewController = new BaseController(
  AppDataSource.getRepository(Review),
);

ReviewController.create = async (req, res) => {
  try {
    const user = req.payload;
    const { propertyId, rating, comment } = req.body;

    if (!user || user.role !== 'tenant') {
      res.status(403).json({ error: 'Only tenants can leave reviews' });
      return;
    }

    const bookingRepo = AppDataSource.getRepository(BookingRequest);
    const booking = await bookingRepo.findOne({
      where: {
        tenant: { id: user.userId },
        property: { id: propertyId },
        status: 'approved',
      },
    });

    if (!booking) {
      res
        .status(403)
        .json({ error: 'You can only review properties you have booked' });
      return;
    }

    const reviewRepo = AppDataSource.getRepository(Review);
    const review = reviewRepo.create({
      author: { id: user.userId },
      property: { id: propertyId },
      rating,
      comment,
    });
    await reviewRepo.save(review);

    res.status(201).json(review);
  } catch (error) {
    console.error('Error in create review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

ReviewController.getAll = async (req, res) => {
  try {
    const { propertyId } = req.query;
    const reviewRepo = AppDataSource.getRepository(Review);

    let where = {};
    if (propertyId) {
      where = { property: { id: Number(propertyId) } };
    }

    const reviews = await reviewRepo.find({
      where,
      relations: ['tenant', 'property'],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error in getAll reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

ReviewController.getById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewRepo = AppDataSource.getRepository(Review);

    const review = await reviewRepo.findOne({
      where: { id: Number(reviewId) },
      relations: ['tenant', 'property'],
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    console.error('Error in getById review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
