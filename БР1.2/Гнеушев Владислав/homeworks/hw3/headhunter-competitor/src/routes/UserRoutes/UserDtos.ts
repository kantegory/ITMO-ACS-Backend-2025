import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID.
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *           example: user@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last user update.
 *
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address for registration.
 *           example: newuser@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: User's password (at least 8 characters).
 *           example: strongP@ssw0rd
 *
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address for login.
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password.
 *           example: stringP@ssw0rd
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: New email address (optional).
 *           example: updateduser@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: New password (optional, at least 8 characters).
 *           example: newStrongP@ssw0rd
 *
 *     RegisterSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User registered successfully
 *         user:
 *           $ref: '#/components/schemas/UserOutput'
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         tokenType:
 *           type: string
 *           example: Bearer
 *
 *     LoginSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login successful
 *         user:
 *           $ref: '#/components/schemas/UserOutput'
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         tokenType:
 *           type: string
 *           example: Bearer
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Invalid input.
 *         errors: # Optional, for validation errors
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               property:
 *                 type: string
 *                 example: email
 *               constraints:
 *                 type: object
 *                 example: { isEmail: "Please provide a valid email address" }
 *               value:
 *                 type: string
 *                 example: "not-an-email"
 */

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({ message: 'Password must be a string' })
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password?: string;
} 