import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Put,
    Query,
    Request,
    Response,
    Route,
    Security,
    SuccessResponse,
    Tags
} from "tsoa";
import userService from '../services/user.service';
import {User} from "../models/models/user.model";
import {toUserResponseModel, updateUserDtoToUpdateModel} from "../mappers/user.mapper";
import {UpdateUserRequestDto} from "../models/requests/user/user-update-request.dto";
import {UserResponseDto} from "@rent/shared";
import {EntityNotFoundErrorDto} from "@rent/shared";


@Route("users")
@Tags("User")
export class UserController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    public async getUsers(): Promise<UserResponseDto[]> {
        const users: User[] = await userService.getUsers();
        return users.map(toUserResponseModel)
    };

    @Get("me")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    public async getUser(@Request() request: any): Promise<UserResponseDto> {
        const retrievedUser = await userService.getUserById(request.user.id);
        return toUserResponseModel(retrievedUser)
    };

    @Get("mail")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    @Security("jwt")
    public async getUserByMail(@Query() mail: string): Promise<UserResponseDto> {
        const user = await userService.getUserByMail(mail);
        return toUserResponseModel(user);
    };

    @Get("{userId}")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    @Security("jwt")
    public async getUserById(@Path() userId: number): Promise<UserResponseDto> {
        const user = await userService.getUserById(userId);
        return toUserResponseModel(user);
    };


    @Put("{userId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundErrorDto>(404, "Entity not found")
    public async updateUser(
        @Path() userId: number,
        @Body() body: UpdateUserRequestDto
    ): Promise<UserResponseDto> {
        const userUpdateModel = updateUserDtoToUpdateModel(body)
        const updated = await userService.update(userId, userUpdateModel);
        return toUserResponseModel(updated);
    }

    @Delete("{userId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deleteUser(@Path() userId: number): Promise<void> {
        await userService.delete(userId);
    }
}


