import { AppDataSource } from "../AppDataSource"
import { Role } from '../models/Role'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security } from 'tsoa'
import { RoleDto, ExtraRoleDto, toRoleDto } from '../dto/Role';

const repository = AppDataSource.getRepository(Role)

@Tags('Role')
@Route('role')
export class RoleController extends Controller {
  @Get()
  public async get(): Promise<RoleDto[]> {
    const roles = await repository.find()
    return roles.map(role => toRoleDto(role))
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<ExtraRoleDto | null> {
    const role = await repository.findOne({ where: { id }, relations: ['users'] })
    if (!role) return null
    return toRoleDto(role)
  }

  @Post()
  @Security('jwt', ['admin'])
  public async create(@Body() body: { name: string }): Promise<RoleDto> {
    const role = await repository.save(body)
    return toRoleDto(role)
  }

  @Put('{id}')
  @Security('jwt', ['admin'])
  public async update(@Path() id: number, @Body() body: { name: string }): Promise<RoleDto> {
    const role = await repository.findOneBy({ id })
    if (!role) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    repository.merge(role, body)
    return await repository.save(role)
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