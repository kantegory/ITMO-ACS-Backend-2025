import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

const CommonController = commonControllerFactory<ReviewEntity>({
  entity: ReviewEntity,
});

@Controller('reviews')
export class ReviewsController extends CommonController {
  constructor(private readonly reviewsService: ReviewsService) {
    super(reviewsService);
  }
  @Get()
  async findAll(@Query() params: PaginateParams): Promise<ReviewEntity[]> {
    return await this.reviewsService.findAll(params);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('media'))
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: { user: JwtUserPayloadDto },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.reviewsService.create(createReviewDto, req.user.id, file);
  }
}
