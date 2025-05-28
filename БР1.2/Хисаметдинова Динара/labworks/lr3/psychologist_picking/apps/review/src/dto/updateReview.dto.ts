import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from '../../../review/src/dto/createReview.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
