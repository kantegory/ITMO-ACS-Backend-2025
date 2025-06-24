import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/createReview.dto';
import { UpdateReviewDto } from '../dto/updateReview.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../types/jwt-payload.type';
import { User } from '../decorators/user.decorator';

@ApiTags('Reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get('myreviews')
  getMyReviews(@User() user: JwtPayload) {
    return this.service.findByClient(user.sub);
  }

  @Get('psychologist/:id')
  getReviewsByPsychologist(@Param('id') id: string) {
    return this.service.findByPsychologist(+id);
  }

  @Post()
  create(
    @Body() dto: CreateReviewDto,
    @Request() req: Request & { user: JwtPayload },
  ) {
    return this.service.create(dto, req.user.sub); // sub, а не id
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
    @Request() req: Request & { user: JwtPayload },
  ) {
    return this.service.update(+id, dto, req.user.sub);
  }
}
