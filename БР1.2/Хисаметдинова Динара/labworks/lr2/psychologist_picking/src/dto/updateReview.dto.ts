import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './createReview.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
