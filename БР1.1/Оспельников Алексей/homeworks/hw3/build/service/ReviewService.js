"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async findAll() {
        const review = await this.reviewRepository.find();
        return { 'status': 200, 'data': review, message: "Reviews found" };
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            return { 'status': 404, 'data': null, message: "Review not found" };
        }
        return { 'status': 200, 'data': review, message: "Review found" };
    }
    async createReview(newreview) {
        try {
            const review = this.reviewRepository.create(newreview);
            const savedReview = await this.reviewRepository.save(review);
            return { 'status': 201, 'data': savedReview, 'message': 'Successfully created' };
        }
        catch (error) {
            return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
        }
    }
    async updateReview(id, data) {
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
        }
        else {
            return { 'status': 404, 'data': null, message: "Review not found" };
        }
    }
    async delete(id) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (review) {
            await this.reviewRepository.remove(review);
            return { 'status': 200, 'message': "Review Deleted successfully" };
        }
        else {
            return { 'status': 404, 'message': "Review not found" };
        }
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=ReviewService.js.map