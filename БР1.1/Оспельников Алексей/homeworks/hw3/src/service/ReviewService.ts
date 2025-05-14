import { Repository } from "typeorm";
import { Review } from "../entity/Review";

export class ReviewService {
  constructor(private readonly reviewRepository: Repository<Review>) {}
  async findAll() {
    const review = await this.reviewRepository.find();
    return { 'status': 200, 'data': review, message: "Reviews found"  };
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      return { 'status': 404, 'data': null, message: "Review not found" }
    }
    return { 'status': 200, 'data': review, message: "Review found" };
  }

  async createReview(newreview: Review) {
    try {
        const review = this.reviewRepository.create(newreview);
        const savedReview = await this.reviewRepository.save(review);
        return { 'status': 201, 'data': savedReview, 'message': 'Successfully created' };
    } 
    catch (error) {
        return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
    }
  }

  async updateReview(id: number, data: Partial<Review>) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (review) {
      try {
        this.reviewRepository.merge(review, data);
        const savedReview = await this.reviewRepository.save(review);
        return { 'status': 200, 'data': savedReview, message: 'Successfully updated' };
      } 
      catch (error) {
        return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
      }
    } else {
      return { 'status': 404, 'data': null, message: "Review not found" };
    }
  }

  async delete(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (review) {
      await this.reviewRepository.remove(review);
      return { 'status': 200, 'message': "Review Deleted successfully" };
    } else {
      return { 'status': 404, 'message': "Review not found" };
    }
  }

}