import authMiddleware, {RequestWithUserId} from "../middlewares/auth.middleware";
import {
    Param,
    Body,
    Get,
    Patch,
    Controller,
    UseBefore, NotFoundError
} from 'routing-controllers';
import userService from "../services/user.service";
import {User} from "../entities/user.entity";

@Controller('/users')
export class UserController {
    @Get()
    @UseBefore(authMiddleware)
    public async getUsers() {
        return await userService.getAll();
    };

    @Get("/me")
    @UseBefore(authMiddleware)
    public async me(@Body() request: RequestWithUserId) {
        const result = await userService.getById(request.userId);
        if (!result) {
            throw new NotFoundError("User not found");
        }
        
        return result;
    };

    @Get('/:id')
    @UseBefore(authMiddleware)
    public async getById(@Param('id') id: string) {
        const result = await userService.getById(id);
        if (!result) {
            throw new NotFoundError("User not found");
        }

        return result;
    };

    @Patch('/:id')
    @UseBefore(authMiddleware)
    public async updateUser(
        @Param('id') id: string,
        @Body() body: Partial<User>
    ){
        return await userService.update(id, body);
    }
}