import { AppDataSource } from "../AppDataSource"
import { Review } from '../models/Review'
import { Controller, Get, Post, Delete, Route, Tags, Body, Path, Security, Request } from 'tsoa'
import { ReviewCreateDto, ReviewDto, toReviewDto } from '../dto/Review';
import { User } from '../models/User'
import { Channel } from '../models/Channel'

const repository = AppDataSource.getRepository(Review)

@Tags('Review')
@Route('review')
export class ReviewController extends Controller {
  @Get()
  public async get(): Promise<ReviewDto[]> {
    const reviews = await repository.find({ relations: ['channel', 'user'] })
    return reviews.map(review => toReviewDto(review))
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<ReviewDto | null> {
    const review = await repository.findOne({ where: { id }, relations: ['channel', 'user'] })
    if (!review) return null
    return toReviewDto(review)
  }

  @Post()
  @Security('jwt')
  public async create(@Body() body: ReviewCreateDto, @Request() req: any): Promise<ReviewDto> {
    const review = await repository.save({text: body.text, rate: body.rate, channel: (await AppDataSource.getRepository(Channel).findOneBy({ id: body.channelId }))!, user: (await AppDataSource.getRepository(User).findOneBy({ username: req.user.username }))!})
    return toReviewDto(review)
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: number) {
    const result = await repository.delete(id)
    if (result.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    return result
  }
}