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
    Security
} from 'tsoa';
import { UserService } from '../services/user';
import { User } from '../models/User';
import {BaseCrudController} from "./base-controller";

@Security('bearerAuth')
@Route('users')
@Tags('User')
export class UserController extends BaseCrudController<User> {
    protected service = new UserService();

    @Get('search')
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
        return super.list();
    }

    @Get('{id}')
    public async detail(@Path() id: string): Promise<User> {
        return super.detail(id);
    }

    @Post()
    @SuccessResponse('201')
    public async create(@Body() dto: Partial<User>): Promise<User> {
        return super.create(dto);
    }

    @Put('{id}')
    public async update(
        @Path() id: string,
        @Body() dto: Partial<User>
    ): Promise<User> {
        return super.update(id, dto);
    }

    @Delete('{id}')
    @SuccessResponse('204')
    public async delete(@Path() id: string): Promise<void> {
        return super.delete(id);
    }
}
