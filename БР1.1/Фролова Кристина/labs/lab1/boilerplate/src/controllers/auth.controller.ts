import {Body, Controller, Post, Route, SuccessResponse, Response, Tags} from "tsoa";
import authService from "../services/auth.service";
import {LoginRequestDto} from "../models/login-request.model";
import {LoginResponseDto} from "../models/login-response.model";
import {RegisterRequestModel} from "../models/register-request.model";
import {RegisterResponseModel} from "../models/register-response.model";
import {ValidateErrorJSON} from "../models/validation-error.model";
import {EntityExistsErrorResponse} from "../models/entity-exists.model";
import {toRegisterResponseModel} from "../mappers/user.mapper";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

    @Post("login")
    @SuccessResponse("200", "Ok")
    public async login(@Body() loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
        return await authService.login(loginRequest);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @Response<EntityExistsErrorResponse>(400, "Bad request")
    @SuccessResponse("201", "Created")
    @Post("register")
    public async register(@Body() registerRequest: RegisterRequestModel): Promise<RegisterResponseModel> {
        const user = await authService.register(registerRequest);
        return toRegisterResponseModel(user);
    }
}