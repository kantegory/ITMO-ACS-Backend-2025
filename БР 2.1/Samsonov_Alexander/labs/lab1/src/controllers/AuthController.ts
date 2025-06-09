import {Body, Controller, Post, Route, Tags} from 'tsoa';
import {AppDataSource} from '../data-source';
import {User} from '../models/User';
import {CreateUserDto, LoginResponseDto, LoginUserDto, UserResponseDto} from '../dtos/UserDto';
import bcrypt from 'bcrypt';
import {generateToken} from '../middleware/authMiddleware';

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
    private userRepository = AppDataSource.getRepository(User);

    @Post('register')
    public async register(@Body() requestBody: CreateUserDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.findOne({
            where: {email: requestBody.email}
        });

        if (existingUser) {
            this.setStatus(400);
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(requestBody.password, 10);

        const user = this.userRepository.create({
            name: requestBody.name,
            email: requestBody.email,
            password: hashedPassword
        });

        await this.userRepository.save(user);

        return new UserResponseDto(user);
    }

    @Post('login')
    public async login(@Body() requestBody: LoginUserDto): Promise<LoginResponseDto> {
        const user = await this.userRepository.findOne({
            where: {email: requestBody.email},
            select: ['id', 'name', 'email', 'password']
        });

        if (!user) {
            this.setStatus(401);
            throw new Error('Invalid email or password');
        }

        await this.checkPassword(requestBody.password, user.password)

        // Generate JWT token
        const token = generateToken({id: user.id, email: user.email});

        // Return token and user data
        return {
            token,
            user: new UserResponseDto(user)
        };
    }
    // util
    private async checkPassword(requestPassword: string, password: string): Promise<boolean> {
        const isPasswordValid = await bcrypt.compare(requestPassword, password);
        if (!isPasswordValid) {
            this.setStatus(401);
            throw new Error('Invalid email or password');
        }
        return true
    }
}