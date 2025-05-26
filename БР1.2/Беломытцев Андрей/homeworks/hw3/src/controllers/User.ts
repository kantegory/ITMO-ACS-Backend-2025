import { AppDataSource } from "../AppDataSource"
import { User } from '../models/User'
import bcryptjs from 'bcryptjs'
import signJWT from '../utils/signJWT'
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Security, Request } from 'tsoa'
import { UserDto, CreateUserDto, LoginUserDto, toUserDto } from '../dto/User';

const repository = AppDataSource.getRepository(User)

@Tags('User')
@Route('user')
export class UserController extends Controller {
  @Get()
  public async get(): Promise<UserDto[]> {
    const users = await repository.find({ relations: ['role', 'channels', 'reviews'] })
    return users.map(user => toUserDto(user))
  }

  @Get('{id}')
  public async getOne(@Path() id: number): Promise<UserDto | null> {
    const user = await repository.findOne({ where: { id }, relations: ['role', 'channels', 'reviews'] })
    if (!user) return null
    return toUserDto(user)
  }

  @Post('register')
  public async register(@Body() body: CreateUserDto): Promise<UserDto> {
    body.password = await bcryptjs.hash(body.password, 10)
    const user = await repository.save(body)
    return toUserDto(user)
  }

  @Post('login')
  public async login(@Body() body: LoginUserDto): Promise<any> {
    let { username, password } = body
    const user = await repository.findOne({ where: { username: username } })
    if (!user) {
      this.setStatus(401)
      throw new Error('No user')
    }
    const isValid = await bcryptjs.compare(password, user.password)
    if (!isValid) {
      this.setStatus(401)
      throw new Error('Invalid password')
    }
    const token = await new Promise<string>((resolve, reject) => {
      signJWT(user, (err: any, token: any) => {
        if (err || !token) reject(err || new Error('Token generation failed'))
        else resolve(token)
      })
    })
    return { message: 'Auth Successfull', token, user: username }
  }

  @Put()
  @Security('jwt')
  public async update(@Body() body: Partial<CreateUserDto>, @Request() req: any): Promise<UserDto> {
    const user = await repository.findOneBy({ username: req.user.username })
    if (!user) {
      this.setStatus(404)
      throw new Error('Not found')
    }
    if (body.password){
      bcryptjs.hash(body.password, 10, async (err, hash) => {
        if (err) {
          this.setStatus(500)
          throw new Error(err.message)
        }
        else {
          body.password = hash!
          repository.merge(user, body)
          return await repository.save(user)
        }
      })
    }
    repository.merge(user, body)
    return toUserDto(await repository.save(user))
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