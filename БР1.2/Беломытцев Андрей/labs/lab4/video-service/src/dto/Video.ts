import { Video } from '../models/Video'

export interface VideoDto {
  id: string
  title: string
  publishedAt: Date
  thumbnail: string
  length?: number
  views?: number
  description: string
  channelId?: string
}

export function toVideoDto(video: Video): VideoDto {
  return {
    id: video.id,
    title: video.title,
    publishedAt: video.publishedAt,
    thumbnail: video.thumbnail,
    length: video.length,
    views: video.views,
    description: video.description,
    channelId: video.channelId
  }
}