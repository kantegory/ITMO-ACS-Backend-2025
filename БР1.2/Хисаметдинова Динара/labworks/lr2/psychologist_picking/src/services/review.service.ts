import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../models/review.entity';
import { User } from '../models/user.entity';
import { Psychologist } from '../models/psychologist.entity';
import { CreateReviewDto } from '../dto/createReview.dto';
import { UpdateReviewDto } from '../dto/updateReview.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Psychologist)
    private readonly psychRepo: Repository<Psychologist>,
  ) {}

  async create(dto: CreateReviewDto, clientId: number) {
    const client = await this.userRepo.findOneByOrFail({ id: clientId });
    const psychologist = await this.psychRepo.findOneByOrFail({
      id: dto.psychologistId,
    });
    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      client,
      psychologist,
    });
    return this.reviewRepo.save(review);
  }

  async update(id: number, dto: UpdateReviewDto, clientId: number) {
    // Находим отзыв и проверяем, что его автор — текущий пользователь (clientId)
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!review) throw new Error('Review not found');
    if (review.client.id !== clientId)
      throw new Error('You can only update your own reviews');

    // Обновляем только разрешённые поля
    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.comment !== undefined) review.comment = dto.comment;
    if (dto.psychologistId !== undefined) {
      review.psychologist = await this.psychRepo.findOneByOrFail({
        id: dto.psychologistId,
      });
    }
    return this.reviewRepo.save(review);
  }
  async findAll() {
    return this.reviewRepo.find({
      relations: ['client', 'psychologist'],
    });
  }

  async findByClient(clientId: number) {
    return this.reviewRepo.find({
      where: { client: { id: clientId } },
      relations: ['psychologist'],
    });
  }

  async findByPsychologist(psychId: number) {
    return this.reviewRepo.find({
      where: { psychologist: { id: psychId } },
      relations: ['client'],
    });
  }

  async findOne(id: number) {
    return this.reviewRepo.findOne({
      where: { id },
      relations: ['client', 'psychologist'],
    });
  }
}
