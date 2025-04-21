"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const repository_1 = require("../repository");
class ReviewController {
    static async all(request, response) {
        const data = await repository_1.reviewRepository.findAll();
        return response.status(200).send(data);
    }
    static async create(request, response) {
        const data = await repository_1.reviewRepository.createReview(request.body);
        return response.status(201).send(data);
    }
    static async findOne(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.reviewRepository.findOne(id);
        return response.send(data);
    }
    static async update(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.reviewRepository.updateReview(id, request.body);
        return response.send(data);
    }
    static async delete(request, response) {
        const id = Number(request.params.id);
        const data = await repository_1.reviewRepository.delete(id);
        return response.send(data);
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=ReviewController.js.map