import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { PrismaClient } from '@prisma/client';
import { StorageService } from 'src/config/s3/s3.service';
@Injectable()
export class ReviewsService extends CommonService<ReviewEntity> {
  constructor(
    private readonly s3Service: StorageService,
    protected readonly prisma: PrismaClient,
  ) {
    super(prisma);
  }
  async findAll(params: PaginateParams): Promise<ReviewEntity[]> {
    const { skip = 0, take = 10 } = params;
    const reviews = await this.prisma.review.findMany({
      skip,
      take,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
            instagram: true,
            language: true,
          },
        },
        auction: {
          select: { auction_id: true, end_price: true, title: true },
        },
      },
    });
    return reviews;
  }
  async create(
    dto: CreateReviewDto,
    userId: number,
    file?: Express.Multer.File,
  ): Promise<ReviewEntity> {
    return this.prisma.$transaction(async (prisma) => {
      // Получаем аукцион
      const auction = await prisma.auction.findUnique({
        where: { auction_id: dto.auction_id },
        include: { winner: true },
      });
      let media_url = '';
      if (file) {
        media_url = await this.s3Service.uploadFile(file);
      }
      const existingReview = await this.prisma.review.findUnique({
        where: { auction_id: dto.auction_id },
      });
      if (existingReview) {
        throw new BadRequestException(
          'You have already submitter a review fot this auction',
        );
      }

      if (!auction) throw new NotFoundException('Auction not found');
      if (auction.state !== 'REVIEW')
        throw new BadRequestException('Auction is not in review state');
      if (auction.winner_id !== userId)
        throw new ForbiddenException('Only the winner can leave a review');

      // Создаем отзыв
      const review = await prisma.review.create({
        data: {
          auction_id: dto.auction_id,
          user_id: userId,
          media_url,
          media_type: dto.media_type,
          comment: dto.comment,
        },
        include: {
          user: {
            select: {
              user_id: true,
              username: true,
              first_name: true,
              last_name: true,
              avatar_url: true,
              instagram: true,
              language: true,
            },
          },
          auction: {
            select: { auction_id: true, end_price: true, title: true },
          },
        },
      });

      return review;
    });
  }
}
