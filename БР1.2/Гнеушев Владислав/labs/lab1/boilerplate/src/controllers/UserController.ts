import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { validate, ValidationError as ClassValidatorError } from 'class-validator';
import { settings } from '../config/settings';
import { myDataSource } from '../config/data-source';
import { BadRequestError, ConflictError, ValidationError, InternalServerError, UnauthorizedError } from '../errors/HttpErrors';
import * as bcrypt from 'bcrypt';

export type UserOutput = {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RegisterSuccessResponse = {
    message: string;
    user: UserOutput;
    token: string;
    tokenType: string;
};

export type LoginSuccessResponse = {
    message: string;
    user: UserOutput;
    token: string;
    tokenType: string;
};

export class UserController {
    private authService = new AuthService();
    private userRepository = myDataSource.getRepository(User);

    async register(userData: { email?: string; password?: string }): Promise<RegisterSuccessResponse> {
        const { email, password } = userData;

        if (!email || !password) {
            throw new BadRequestError('Email and password are required');
        }

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictError('Email already in use');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User();
        user.email = email;
        user.password = hashedPassword;

        const validationErrors: ClassValidatorError[] = await validate(user);
        if (validationErrors.length > 0) {
            const mappedErrors = validationErrors.map(err => ({
                property: err.property,
                constraints: err.constraints,
                value: err.value,
            }));
            throw new ValidationError(mappedErrors);
        }

        try {
            const newUser = await this.userRepository.save(user);
            const token = this.authService.generateToken(newUser);

            const userOutput: UserOutput = {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            };

            return {
                message: 'User registered successfully',
                user: userOutput,
                token,
                tokenType: settings.auth.TOKEN_TYPE,
            };
        } catch (error) {
            console.error('Persistence or token generation error during user registration:', error);
            throw new InternalServerError('Failed to register user due to an internal server issue.');
        }
    }

    async login(credentials: { email?: string; password?: string }): Promise<LoginSuccessResponse> {
        const { email, password } = credentials;

        if (!email || !password) {
            throw new BadRequestError('Email and password are required for login.');
        }

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        try {
            const token = this.authService.generateToken(user);
            const userOutput: UserOutput = {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };

            return {
                message: 'Login successful',
                user: userOutput,
                token,
                tokenType: settings.auth.TOKEN_TYPE,
            };
        } catch (error) {
            console.error('Token generation error during login:', error);
            throw new InternalServerError('Failed to login due to an internal server issue.');
        }
    }
} 