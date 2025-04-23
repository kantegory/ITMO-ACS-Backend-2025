import { Repository } from 'typeorm';
import { User } from '../models/User';
import { CrudController } from './CrudController';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware';
import { 
    Route, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Path, 
    Query, 
    SuccessResponse, 
    Tags,
    Security,
    Example
} from "tsoa";
import {AppDataSource} from "../data-source";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}

@Route("users")
@Tags("Users")
export class UserController extends CrudController<User> {
    constructor(
        private readonly userRepository: Repository<User> = AppDataSource.getRepository(User),
        exposedFields: (keyof User)[] = []
    ) {
        super(userRepository, exposedFields);
    }


    /**
     * Register a new user
     * @param requestBody User registration data
     * @returns The registered user and authentication token
     */
    @Post("register")
    @SuccessResponse("201", "Created")
    public async register(@Body() requestBody: RegisterRequest): Promise<AuthResponse> {
        const { name, email, password } = requestBody;

        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }

        // Check if user already exists
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await this.userRepository.save(user);

        const token = generateToken({ id: savedUser.id, email: savedUser.email });

        const { password: _, ...userWithoutPassword } = savedUser;
        return {
            user: userWithoutPassword as any,
            token
        };
    }

    /**
     * Login a user
     * @param requestBody User login credentials
     * @returns The user and authentication token
     */
    @Post("login")
    public async login(@Body() requestBody: LoginRequest): Promise<AuthResponse> {
        const { email, password } = requestBody;

        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken({ id: user.id, email: user.email });

        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword as any,
            token
        };
    }

    /**
     * Get a user by email
     * @param email The email of the user to retrieve
     * @returns The user with the specified email
     * @example email "john.doe@example.com"
     */
    @Get("email/{email}")
    public async getUserByEmail(@Path() email: string): Promise<User> {
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // @ts-ignore
        return this.filterFields(user);
    }

    /**
     * Get a user by ID
     * @param id The ID of the user to retrieve
     * @returns The user with the specified ID
     * @example id 1
     */
    @Get("{id}")
    public async getOne(@Path() id: number): Promise<User> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new Error('User not found');
        }

        // @ts-ignore
        return this.filterFields(user);
    }
}
