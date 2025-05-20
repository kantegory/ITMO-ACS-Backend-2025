import { AppDataSource } from "../AppDataSource"
import { Channel } from '../models/Channel'
import config from '../config';
import { Video } from '../models/Video'
import { User } from '../models/User'
import { Category } from '../models/Category'
import { Theme } from '../models/Theme'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Request } from 'tsoa'
import { ChannelCreateDto, ChannelDto, toChannelDto } from '../dto/Channel';

const repository = AppDataSource.getRepository(Channel)

const getVideos = async (ytid: string, maxResults: number = 50) => {
  const uploads = 'UULF' + ytid.slice(2)
  const videos: any = await (await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=${maxResults}&playlistId=${uploads}&key=${config.YT_API_KEY}`)).json()
  var videosList: Video[] = []
  for(var m of videos['items']){
    var m = m['snippet']
    videosList.push({
      'id': m['resourceId']['videoId'],
      'channel': m['channelId'],
      'title': m['title'],
      'publishedAt': m['publishedAt'],
      'thumbnail': m['thumbnails']['maxres' in m['thumbnails'] ? 'maxres' : 'medium']['url'],
      'description': m['description'],
    } as Video)
  }
  return videosList
}

const getChannel = async (ytid: string, lang: string, category: string, theme: string, username: string): Promise<Channel> => {
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${ytid}&key=${config.YT_API_KEY}`)
  if (!response.ok) throw new Error('Network response was not ok')
  const data: any = await response.json()
  var stat = data['items'][0]['statistics']
  var icon = data['items'][0]['snippet']['thumbnails']
  // var ytid = data['items'][0]['id']

  var videosList = await getVideos(ytid)

  var channel = {
    id: ytid,
    url: 'https://www.youtube.com/channel/' + ytid,
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
    user: await AppDataSource.getRepository(User).findOneBy({ username: username }),
    videosList: videosList,
  } as Channel

  return channel
}

@Tags('Channel')
@Route('channel')
export class ChannelController extends Controller {
  @Get()
  public async get(): Promise<ChannelDto[]> {
    var channels = await repository.find({ relations: ['category', 'theme', 'user', 'videosList', 'reviews'] })
    return channels.map(channel => toChannelDto(channel))
  }

  /**
   * @example id "UCHnyfMqiRRG1u-2MsSQLbXA"
   */
  @Get('{id}')
  public async getOne(@Path() id: string): Promise<ChannelDto | null> {
    var channel = await repository.findOne({ where: { id }, relations: ['category', 'theme', 'videosList', 'reviews'] })
    if (!channel) return null
    return toChannelDto(channel) 
  }

  @Post()
  @Security('jwt')
  public async create(@Body() body: ChannelCreateDto, @Request() req: any): Promise<ChannelDto> {
    var channel = await getChannel(
      body.id, 
      body.lang, 
      body.theme,
      body.category,
      req.user.username
    )
    var channel = await repository.save(channel)
    return toChannelDto(channel) 
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: string, @Body() body: Partial<ChannelCreateDto>): Promise<ChannelDto> {
    const x = await repository.findOneBy({ id })
    if (!x) {
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
    repository.merge(x, updated)
    var channel = await repository.save(x)
    return toChannelDto(channel)
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: string) {
    const r = await repository.delete(id)
    if (r.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    return r
  }
}