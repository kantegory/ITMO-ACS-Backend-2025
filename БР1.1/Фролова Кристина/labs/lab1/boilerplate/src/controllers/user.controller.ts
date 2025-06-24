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
import {EntityNotFoundErrorResponse} from "../models/entity-not-found.model";
import {UserResponseModel} from "../models/user-response.model";
import {toUserResponseModel} from "../mappers/user.mapper";
import {UpdateUserRequestModel} from "../models/user-update-request.model";
import {User} from "../models/user.model";

@Route("users")
@Tags("User")
export class UserController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundErrorResponse>(404, "Entity not found")
    public async getUsers(): Promise<UserResponseModel[]> {
        const users: User[] = await userService.getUsers();
        return users.map(toUserResponseModel)
    };

    @Get("me")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundErrorResponse>(404, "Entity not found")
    public async getUser(@Request() request: any): Promise<UserResponseModel> {
        const retrievedUser = await userService.getUserById(request.user.id);
        return toUserResponseModel(retrievedUser)
    };

    @Get("mail")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundErrorResponse>(404, "Entity not found")
    @Security("jwt")
    public async getUserByMail(@Query() mail: string): Promise<UserResponseModel> {
        const user = await userService.getUserByMail(mail);
        return toUserResponseModel(user);
    };

    @Get("{userId}")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundErrorResponse>(404, "Entity not found")
    @Security("jwt")
    public async getUserById(@Path() userId: number): Promise<UserResponseModel> {
        const user = await userService.getUserById(userId);
        return toUserResponseModel(user);
    };

    @Put("{userId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundErrorResponse>(404, "Entity not found")
    public async updateUser(
        @Path() userId: number,
        @Body() body: UpdateUserRequestModel
    ): Promise<UserResponseModel> {
        const updated = await userService.update(userId, body);
        return toUserResponseModel(updated);
    }

    @Delete("{userId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deleteUser(@Path() userId: number): Promise<void> {
        await userService.delete(userId);
    }
}


