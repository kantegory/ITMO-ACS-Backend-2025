import {
    JsonController,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    QueryParam,
    Body,
    UseBefore,
    HttpCode,
    Req,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';

class UserResponse {
user_id!: number;
name!: string;
email!: string;
phone?: string;
}

@JsonController('/users')
export class UserController {
    @Post('/')
    @HttpCode(201)
    @OpenAPI({ summary: 'Create user' })
    @ResponseSchema(UserResponse, { statusCode: 201 })
    async create(@Body() dto: CreateUserDto) {
        return UserService.createUser(dto);
    }

    @Get('/')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'List users' })
    @ResponseSchema(UserResponse, { isArray: true })
    async findAll() {
        return UserService.getAllUsers();
    }

    @Get('/me')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Get current user' })
    @ResponseSchema(UserResponse)
    async me(@Req() req: any) {
        const u = await UserService.getUserById(req.user.userId);
        if (!u) throw { status: 404, message: 'User not found' };
        return u;
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Get user by id' })
    @ResponseSchema(UserResponse)
    async findOne(@Param('id') id: number) {
        const u = await UserService.getUserById(id);
        if (!u) throw { status: 404, message: 'User not found' };
        return u;
    }

    @Get('/by-email')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Get user by email' })
    @ResponseSchema(UserResponse)
    async findByEmail(@QueryParam('email') email: string) {
        const u = await UserService.getUserByEmail(email);
        if (!u) throw { status: 404, message: 'User not found' };
        return u;
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Update user' })
    @ResponseSchema(UserResponse)
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return UserService.updateUser(id, dto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Delete user' })
    async remove(@Param('id') id: number) {
        await UserService.deleteUser(id);
    }
}  