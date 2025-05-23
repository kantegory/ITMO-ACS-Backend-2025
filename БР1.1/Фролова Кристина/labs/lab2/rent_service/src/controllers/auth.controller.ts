import {Body, Controller, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import authService from "../services/auth.service";
import {LoginRequestDto} from "../models/requests/auth/login-request.dto";
import {LoginResponseDto} from "../models/responses/login-response.dto";
import {RegisterRequestDto} from "../models/requests/auth/register-request.dto";
import {RegisterResponseDto} from "../models/responses/register-response.dto";
import {ValidateErrorJSON} from "../models/errors/validation-error.model";
import {EntityExistsError} from "../models/errors/entity-exists.model";
import {toLoginResponseDto, toRegisterRequestModel, toRegisterResponseModel} from "../mappers/auth.mapper";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

    @Post("login")
    @SuccessResponse("200", "Ok")
    public async login(@Body() loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
        const accessToken = await authService.login(loginRequest);
        return toLoginResponseDto(accessToken);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @Response<EntityExistsError>(400, "Bad request")
    @SuccessResponse("201", "Created")
    @Post("register")
    public async register(@Body() registerRequest: RegisterRequestDto): Promise<RegisterResponseDto> {
        const user = await authService.register(toRegisterRequestModel(registerRequest));
        return toRegisterResponseModel(user);
    }
}