import { AppDataSource } from "../AppDataSource"
import { Video } from '../models/Video'
import { Controller, Get, Delete, Route, Tags, Path, Security } from 'tsoa'
import { VideoDto, toVideoDto } from '../dto/Video';

const repository = AppDataSource.getRepository(Video)

@Tags('Video')
@Route('video')
export class VideoController extends Controller {
  @Get()
  public async get(): Promise<VideoDto[]> {
    const videos = await repository.find({ relations: ['channel'] })
    return videos.map(video => toVideoDto(video))
  }

  @Get('{id}')
  public async getOne(@Path() id: string): Promise<VideoDto | null> {
    const video = await repository.findOne({ where: { id }, relations: ['channel'] })
    if (!video) return null
    return toVideoDto(video)
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: string) {
    const result = await repository.delete(id)
    if (result.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    return result
  }
}