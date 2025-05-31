import { AppDataSource } from "../AppDataSource"
import { Channel } from '../models/Channel'
import config from '../config';
import { Category } from '../models/Category'
import { Theme } from '../models/Theme'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Request } from 'tsoa'
import { ChannelCreateDto, ChannelDto, toChannelDto } from '../dto/Channel';

import { sendToQueue, listenToQueue } from '../rabbit'

const repository = AppDataSource.getRepository(Channel)

const getChannel = async (channelId: string, lang: string, category: string, theme: string, userId: number): Promise<Channel> => {
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${config.YT_API_KEY}`)
  if (!response.ok) throw new Error('Network response was not ok')
  const data: any = await response.json()
  const stat = data['items'][0]['statistics']
  const icon = data['items'][0]['snippet']['thumbnails']
  // const channelId = data['items'][0]['id']

  await sendToQueue('add_videos', { channelId: channelId })

  const channel = {
    id: channelId,
    url: 'https://www.youtube.com/channel/' + channelId,
    title: data['items'][0]['snippet']['title'],
    views: parseInt(stat["viewCount"]),
    subs: parseInt(stat["subscriberCount"]),
    videos: parseInt(stat["videoCount"]),
    lang: lang,
    category: await AppDataSource.getRepository(Category).findOneBy({ name: category }),
    theme: await AppDataSource.getRepository(Theme).findOneBy({ name: theme }),
    iconDefault: icon['default']['url'],
    iconMedium: icon['medium']['url'],
    iconHigh: icon['high']['url'],
    description: data['items'][0]['snippet']['description'],
    isApproved: false,
    userId: userId,
    // videosList: videosList,
  } as Channel

  return channel
}

@Tags('Channel')
@Route('channel')
export class ChannelController extends Controller {
  @Get()
  public async get(): Promise<ChannelDto[]> {
    const channels = await repository.find({ relations: ['category', 'theme'] })
    return channels.map(channel => toChannelDto(channel))
  }

  /**
   * @example id "UCHnyfMqiRRG1u-2MsSQLbXA"
   */
  @Get('{id}')
  public async getOne(@Path() id: string): Promise<ChannelDto | null> {
    const channel = await repository.findOne({ where: { id }, relations: ['category', 'theme'] })
    if (!channel) return null
    return toChannelDto(channel) 
  }

  @Post()
  @Security('jwt')
  public async create(@Body() body: ChannelCreateDto, @Request() req: any): Promise<ChannelDto> {
    const channel = await getChannel(
      body.id, 
      body.lang, 
      body.category,
      body.theme,
      req.user.userId
    )
    return toChannelDto(await repository.save(channel)) 
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: string, @Body() body: Partial<ChannelCreateDto>): Promise<ChannelDto> {
    const channel = await repository.findOneBy({ id })
    if (!channel) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    const updated: any = {...body}
    if (body.category) {
      updated.category = await AppDataSource.getRepository(Category).findOneBy({ name: body.category })
    }
    if (body.theme) {
      updated.theme = await AppDataSource.getRepository(Theme).findOneBy({ name: body.theme })
    }
    repository.merge(channel, updated)
    return toChannelDto(await repository.save(channel))
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: string) {
    const result = await repository.delete(id)
    if (result.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    await sendToQueue('delete_videos', { channelId: id })
    return result
  }
}