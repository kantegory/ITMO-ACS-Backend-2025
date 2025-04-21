import { Repository } from "typeorm";
import { Review } from "../entity/Review";

export class ReviewService {
  constructor(private readonly reviewRepository: Repository<Review>) {}
  async findAll() {
    const reviews = await this.reviewRepository.find();
    return reviews;
  }
  async findOne(id: number) {
    const reviews = await this.reviewRepository.findOne({ where: { id } });
    return reviews;
  }

  async createReview(newreview: Review) {
    const review = this.reviewRepository.create(newreview);
    await this.reviewRepository.save(review);
    return review;
  }

  async updateReview(id: number, data: Partial<Review>) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (review) {
      this.reviewRepository.merge(review, data);
      await this.reviewRepository.save(review);
      return review;
    } else {
      return { message: "Review not found" };
    }
  }

  async delete(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (review) {
      await this.reviewRepository.remove(review);
      return { message: "Review Deleted successfully" };
    } else {
      return { message: "Review not found" };
    }
  }

}