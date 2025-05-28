import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../models/review.entity';
import { User } from '../models/user.entity';
import { Psychologist } from '../models/psychologist.entity';
import { ReviewService } from '../services/review.service';
import { ReviewController } from '../controllers/review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Psychologist])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
