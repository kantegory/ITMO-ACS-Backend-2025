import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { CreateUserDto, LoginResponseDto, LoginUserDto, UserResponseDto } from '../dtos/UserDto';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware';

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Register a new user
   */
  @Post('register')
  public async register(@Body() requestBody: CreateUserDto): Promise<UserResponseDto> {
    // Check if user with this email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: requestBody.email }
    });

    if (existingUser) {
      this.setStatus(400);
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);

    // Create new user
    const user = this.userRepository.create({
      name: requestBody.name,
      email: requestBody.email,
      password: hashedPassword
    });

    // Save user to database
    await this.userRepository.save(user);

    // Return user data without password
    return new UserResponseDto(user);
  }

  /**
   * Login with email and password
   */
  @Post('login')
  public async login(@Body() requestBody: LoginUserDto): Promise<LoginResponseDto> {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email: requestBody.email },
      select: ['id', 'name', 'email', 'password'] // Include password for verification
    });

    if (!user) {
      this.setStatus(401);
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(requestBody.password, user.password);
    if (!isPasswordValid) {
      this.setStatus(401);
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    // Return token and user data
    return {
      token,
      user: new UserResponseDto(user)
    };
  }
}