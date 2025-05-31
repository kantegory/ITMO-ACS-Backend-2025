import { Channel } from '../models/Channel'

export interface ChannelCreateDto {
  id: string,
  lang: string,
  category: string,
  theme: string,
}

export interface ChannelDto {
  id: string
  url: string
  title: string
  views: number
  subs: number
  videos: number
  lang: string
  iconDefault: string
  iconMedium: string
  iconHigh: string
  description: string
  isApproved: boolean
  timeCreate: Date
  timeUpdate: Date
  category: number
  theme: number
  userId: number
  // videosList: string[]
  reviews?: number[]
}

export function toChannelDto(channel: Channel): ChannelDto {
  return {
    id: channel.id,
    url: channel.url,
    title: channel.title,
    views: channel.views,
    subs: channel.subs,
    videos: channel.videos,
    lang: channel.lang,
    iconDefault: channel.iconDefault,
    iconMedium: channel.iconMedium,
    iconHigh: channel.iconHigh,
    description: channel.description,
    isApproved: channel.isApproved,
    timeCreate: channel.timeCreate,
    timeUpdate: channel.timeUpdate,
    category: channel.category?.id,
    theme: channel.theme?.id,
    userId: channel.userId,
    // videosList: channel.videosList?.map(video => video.id),
    reviews: channel.reviews?.map(review => review.id)
  }
}