import { Body, Post, Route, SuccessResponse, Response, Tags, Controller } from 'tsoa';
import { AuthService } from '../services/auth';
import { User } from '../models/User';

interface RegisterRequest {
    email: string;
    username: string;
    name: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    private authService = new AuthService();

    @Post('register')
    @SuccessResponse('201', 'Created')
    @Response<Error>(400, 'Bad Request')
    public async register(@Body() body: RegisterRequest): Promise<User> {
        const user = await this.authService.register(
            body.email,
            body.username,
            body.name,
            body.password
        );
        this.setStatus(201);
        return user;
    }

    @Post('login')
    @SuccessResponse('200', 'OK')
    @Response<Error>(401, 'Unauthorized')
    public async login(@Body() body: LoginRequest): Promise<AuthResponse> {
        const { accessToken, tokenType, expiresIn } = await this.authService.login(
            body.email,
            body.password
        );
        return { accessToken, tokenType, expiresIn };
    }
}
