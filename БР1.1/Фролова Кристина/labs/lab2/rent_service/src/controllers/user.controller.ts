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
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";
import {UserResponseDto} from "../models/responses/user-response.dto";
import {toUserResponseModel, updateUserDtoToUpdateModel} from "../mappers/user.mapper";
import {UpdateUserRequestDto} from "../models/requests/user/user-update-request.dto";
import {User} from "../models/models/user.model";
import {RentalResponseDto} from "../models/responses/rental-response.dto";
import rentalService from "../services/rental.service";
import {toRentalResponseModel} from "../mappers/rental.mapper";

@Route("users")
@Tags("User")
export class UserController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getUsers(): Promise<UserResponseDto[]> {
        const users: User[] = await userService.getUsers();
        return users.map(toUserResponseModel)
    };

    @Get("me")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getUser(@Request() request: any): Promise<UserResponseDto> {
        const retrievedUser = await userService.getUserById(request.user.id);
        return toUserResponseModel(retrievedUser)
    };

    @Get("mail")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundError>(404, "Entity not found")
    @Security("jwt")
    public async getUserByMail(@Query() mail: string): Promise<UserResponseDto> {
        const user = await userService.getUserByMail(mail);
        return toUserResponseModel(user);
    };

    @Get("{userId}")
    @SuccessResponse("200", "Ok")
    @Response<EntityNotFoundError>(404, "Entity not found")
    @Security("jwt")
    public async getUserById(@Path() userId: number): Promise<UserResponseDto> {
        const user = await userService.getUserById(userId);
        return toUserResponseModel(user);
    };

    @Get("{ownerId}/owner")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getRentalsByOwnerId(@Path() ownerId: number): Promise<RentalResponseDto[]> {
        const rentals = await rentalService.getRentalsByOwnerId(ownerId);
        return rentals.map(toRentalResponseModel);
    }

    @Get("{renterId}/renter")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getRentalsByRenterId(@Path() renterId: number): Promise<RentalResponseDto[]> {
        const rentals = await rentalService.getRentalsByRenterId(renterId);
        return rentals.map(toRentalResponseModel);
    }

    @Put("{userId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
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


