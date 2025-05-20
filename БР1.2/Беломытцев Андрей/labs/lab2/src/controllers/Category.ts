import { AppDataSource } from "../AppDataSource"
import { Category } from '../models/Category'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security } from 'tsoa'
import { CategoryDto, ExtraCategoryDto, toCategoryDto } from '../dto/Category';

const repository = AppDataSource.getRepository(Category)

@Tags('Category')
@Route('category')
export class CategoryController extends Controller {
  @Get()
  public async get(): Promise<CategoryDto[]> {
    var categories = await repository.find()
    return categories.map(category => toCategoryDto(category))
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<ExtraCategoryDto | null> {
    var category = await repository.findOne({ where: { id }, relations: ['channels'] })
    if (!category) return null
    return toCategoryDto(category)
  }

  @Post()
  @Security('jwt', ['admin'])
  public async create(@Body() body: { name: string }): Promise<CategoryDto> {
    var category = await repository.save(body)
    return toCategoryDto(category)
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: number, @Body() body: { name: string }): Promise<CategoryDto> {
    const x = await repository.findOneBy({ id })
    if (!x) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    repository.merge(x, body)
    var category = await repository.save(x)
    return category
  }
  
  @Delete('{id}')
  @Security('jwt', ['admin'])
  public async remove(@Path() id: number) {
    const r = await repository.delete(id)
    if (r.affected === 0) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    return r
  }
}