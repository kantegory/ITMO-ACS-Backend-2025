import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async create(dto: CreateReviewDto, clientId: number) {
    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      clientId,
      psychologistId: dto.psychologistId,
    });
    return this.reviewRepo.save(review);
  }

  async update(id: number, dto: UpdateReviewDto, clientId: number) {
    const review = await this.reviewRepo.findOneBy({ id });
    if (!review) throw new Error('Review not found');
    if (review.clientId !== clientId)
      throw new Error('You can only update your own reviews');

    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.comment !== undefined) review.comment = dto.comment;
    if (dto.psychologistId !== undefined)
      review.psychologistId = dto.psychologistId;

    return this.reviewRepo.save(review);
  }

  async findAll() {
    return this.reviewRepo.find();
  }

  async findByClient(clientId: number) {
    return this.reviewRepo.find({ where: { clientId } });
  }

  async findByPsychologist(psychId: number) {
    return this.reviewRepo.find({ where: { psychologistId: psychId } });
  }

  async findOne(id: number) {
    return this.reviewRepo.findOneBy({ id });
  }
}
