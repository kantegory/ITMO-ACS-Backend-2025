import { AppDataSource } from "../AppDataSource"
import { Theme } from '../models/Theme'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security } from 'tsoa'
import { ThemeDto, ExtraThemeDto, toThemeDto } from '../dto/Theme';

const repository = AppDataSource.getRepository(Theme)

@Tags('Theme')
@Route('theme')
export class ThemeController extends Controller {
  @Get()
  public async get(): Promise<ThemeDto[]> {
    const themes = await repository.find()
    return themes.map(theme => toThemeDto(theme))
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<ExtraThemeDto | null> {
    const theme = await repository.findOne({ where: { id }, relations: ['channels'] })
    if (!theme) return null
    return toThemeDto(theme)
  }

  @Post()
  @Security('jwt', ['admin'])
  public async create(@Body() body: { name: string }): Promise<ThemeDto> {
    const theme = await repository.save(body)
    return toThemeDto(theme)
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: number, @Body() body: { name: string }): Promise<ThemeDto> {
    const theme = await repository.findOneBy({ id })
    if (!theme) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    repository.merge(theme, body)
    return toThemeDto(await repository.save(theme))
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