import { AppDataSource } from '../config/databaseConfig';
import { Review } from '../entities/Review';
import { BookingRequest } from '../entities/BookingRequest';
import { UserRole } from '../entities/User';

class ReviewService {
  public repo = AppDataSource.getRepository(Review);
  private bookingRepo = AppDataSource.getRepository(BookingRequest);

  async create(
    user: any,
    propertyId: number,
    rating: number,
    comment: string,
  ): Promise<Review> {
    if (!user || user.role !== UserRole.TENANT) {
      throw { status: 403, message: 'Only tenants can leave reviews' };
    }
    const booking = await this.bookingRepo.findOne({
      where: {
        tenant: { id: user.userId },
        property: { id: propertyId },
      },
    });
    if (!booking) {
      throw {
        status: 403,
        message: 'You can only review properties you have booked',
      };
    }
    if (rating < 1 || rating > 5) {
      throw { status: 400, message: 'Rating must be between 1 and 5' };
    }
    const review = this.repo.create({
      author: { id: user.userId },
      property: { id: propertyId },
      rating,
      comment,
    });
    return this.repo.save(review);
  }

  async getAll(propertyId?: number): Promise<Review[]> {
    const where = propertyId ? { property: { id: propertyId } } : {};
    return this.repo.find({
      where,
      relations: ['author', 'property'],
    });
  }

  async getById(id: number): Promise<Review> {
    const review = await this.repo.findOne({
      where: { id },
      relations: ['author', 'property'],
    });
    if (!review) throw { status: 404, message: 'Review not found' };
    return review;
  }
}

export default new ReviewService();
