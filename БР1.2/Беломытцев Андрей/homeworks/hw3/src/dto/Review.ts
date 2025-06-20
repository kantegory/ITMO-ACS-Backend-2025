import { Review } from '../models/Review'

export interface ReviewCreateDto {
  channelId: string
  text: string
  rate: number
}

export interface ReviewDto {
  id: number
  rate: number
  text: string
  timeCreate: Date
  channelId?: string
  userId?: number
}

export function toReviewDto(review: Review): ReviewDto {
  return {
    id: review.id,
    rate: review.rate,
    text: review.text,
    timeCreate: review.timeCreate,
    channelId: review.channel?.id,
    userId: review.user?.id,
  }
}