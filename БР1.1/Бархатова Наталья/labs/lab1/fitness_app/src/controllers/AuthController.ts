import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import { User } from '../models/User';
import { UserDetails } from '../models/UserDetails';
import { AppDataSource } from '../AppDataSource';
import { AuthService } from '../services/AuthService';

@JsonController('/auth')
export class AuthController {
  private userRepository = AppDataSource.getRepository(User);
  private userDetailsRepository = AppDataSource.getRepository(UserDetails);
  private authService = new AuthService();

  @Post('/register')
  async register(@Body() userData: { email: string; password: string; username: string; details: UserDetails }) {
    const { email, password, username, details } = userData;

    const existingUser = await this.userRepository.findOne({ where: [{ email }] });
    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
      details: this.userDetailsRepository.create(details) 
    });

    await this.userRepository.save(user);

    const token = this.authService.generateToken(user);
    return { token };
  }

  @Post('/login')
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    const user = await this.userRepository.findOne({ where: { email }, relations: ['details', 'posts', 'progress', 'trainingPlans'] });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordValid = await this.authService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid credentials');
    }

    const token = this.authService.generateToken(user);
    return { token };
  }
}
