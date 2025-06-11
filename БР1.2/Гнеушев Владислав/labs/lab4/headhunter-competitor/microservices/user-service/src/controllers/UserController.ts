import { UserService } from '../services/UserService';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from '../routes/UserDtos';
import { HttpError, BadRequestError, NotFoundError, ConflictError, InternalServerError, UnauthorizedError } from '../errors/HttpErrors';

export type UserOutput = {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt?: Date;
    employeeCabinet?: any;
    employerCabinet?: any;
};

export type RegisterSuccessResponse = {
    success: boolean;
    message: string;
    data: {
        user: UserOutput;
        token: string;
    };
};

export type LoginSuccessResponse = {
    success: boolean;
    message: string;
    data: {
        user: UserOutput;
        token: string;
    };
};

export type UserProfileResponse = {
    success: boolean;
    data: UserOutput;
};

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async register(userData: RegisterUserDto): Promise<RegisterSuccessResponse> {
        try {
            const createUserDto = {
                email: userData.email,
                password: userData.password
            };
            
            const result = await this.userService.createUser(createUserDto);
            
            return {
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        createdAt: result.user.createdAt,
                        employeeCabinet: result.user.employeeCabinet,
                        employerCabinet: result.user.employerCabinet
                    },
                    token: result.token
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('already exists')) {
                    throw new ConflictError('Email already in use');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Registration failed');
        }
    }

    public async login(credentials: LoginUserDto): Promise<LoginSuccessResponse> {
        try {
            const loginDto = {
                email: credentials.email,
                password: credentials.password
            };
            
            const result = await this.userService.login(loginDto);
            
            return {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        createdAt: result.user.createdAt,
                        employeeCabinet: result.user.employeeCabinet,
                        employerCabinet: result.user.employerCabinet
                    },
                    token: result.token
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new UnauthorizedError('Invalid email or password');
            }
            throw new InternalServerError('Login failed');
        }
    }

    public async getProfile(userId: number): Promise<UserProfileResponse> {
        try {
            const user = await this.userService.getUserById(userId);
            
            if (!user) {
                throw new NotFoundError('User not found');
            }

            return {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    employeeCabinet: user.employeeCabinet,
                    employerCabinet: user.employerCabinet
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get profile');
        }
    }

    public async getUserById(userId: number): Promise<UserProfileResponse> {
        try {
            const user = await this.userService.getUserById(userId);
            
            if (!user) {
                throw new NotFoundError('User not found');
            }

            return {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    employeeCabinet: user.employeeCabinet,
                    employerCabinet: user.employerCabinet
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get user');
        }
    }

    public async updateProfile(userId: number, updateData: UpdateUserDto): Promise<UserProfileResponse> {
        try {
            const updatedUser = await this.userService.updateUser(userId, updateData);
            
            return {
                success: true,
                data: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt,
                    employeeCabinet: updatedUser.employeeCabinet,
                    employerCabinet: updatedUser.employerCabinet
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to update profile');
        }
    }
} 