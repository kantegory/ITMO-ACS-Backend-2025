"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async findAll() {
        const reviews = await this.reviewRepository.find();
        return reviews;
    }
    async findOne(id) {
        const reviews = await this.reviewRepository.findOne({ where: { id } });
        return reviews;
    }
    async createReview(newreview) {
        const review = this.reviewRepository.create(newreview);
        await this.reviewRepository.save(review);
        return review;
    }
    async updateReview(id, data) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (review) {
            this.reviewRepository.merge(review, data);
            await this.reviewRepository.save(review);
            return review;
        }
        else {
            return { message: "Review not found" };
        }
    }
    async delete(id) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (review) {
            await this.reviewRepository.remove(review);
            return { message: "Review Deleted successfully" };
        }
        else {
            return { message: "Review not found" };
        }
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=reviewService.js.map