import {
    Route,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Path,
    Query,
    SuccessResponse,
    Tags,
    Response,
    Security, Controller
} from 'tsoa';
import {UserService} from '../services/user';
import {User} from '../models/User';

@Security('bearerAuth')
@Route('users')
@Tags('User')
export class UserController extends Controller {
    private service = new UserService();

    @Get('byEmail')
    @Response<Error>(400, 'Bad Request')
    public async getOneByEmail(@Query() email?: string): Promise<User> {
        if (!email) {
            this.setStatus(400);
            throw new Error('Email query parameter is required');
        }
        const user = await this.service.getByEmail(email);
        if (!user) {
            this.setStatus(404);
            throw new Error('User not found');
        }
        return user;
    }

    @Get()
    public async list(): Promise<User[]> {
        return this.service.list();
    }

    @Get('{id}')
    public async detail(@Path() id: string): Promise<User> {
        return this.service.getById(id);
    }

    @Post()
    @SuccessResponse('201')
    public async create(@Body() dto: Partial<User>): Promise<User> {
        return this.service.create(dto);
    }

    @Put('{id}')
    public async update(
        @Path() id: string,
        @Body() dto: Partial<User>
    ): Promise<User> {
        return this.service.update(id, dto);
    }

    @Delete('{id}')
    @SuccessResponse('204')
    public async delete(@Path() id: string): Promise<void> {
        await this.service.delete(id);
    }
}
