import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     EmployeeCabinetOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 456
 *         profileInfo:
 *           type: string
 *           example: "Detail-oriented software developer with 5 years of experience."
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateEmployeeCabinetDto:
 *       type: object
 *       required:
 *         - userId
 *         - profileInfo
 *         - firstName
 *         - lastName
 *       properties:
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with this employee cabinet.
 *           example: 456
 *         profileInfo:
 *           type: string
 *           description: Professional summary or profile information for the employee.
 *           example: "Experienced Full-Stack Developer seeking new opportunities."
 *         firstName:
 *           type: string
 *           description: Employee's first name.
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Employee's last name.
 *           example: "Doe"
 *
 *     UpdateEmployeeCabinetDto:
 *       type: object
 *       properties:
 *         profileInfo:
 *           type: string
 *           nullable: true
 *           description: Updated professional summary or profile information (optional).
 *           example: "Senior Full-Stack Developer with expertise in cloud technologies."
 *         firstName:
 *           type: string
 *           nullable: true
 *           description: Updated first name (optional).
 *           example: "Jonathan"
 *         lastName:
 *           type: string
 *           nullable: true
 *           description: Updated last name (optional).
 *           example: "Doer"
 */

export class CreateEmployeeCabinetDto {
    @IsNotEmpty({ message: 'User ID should not be empty' })
    @IsNumber({}, { message: 'User ID must be a number' })
    userId!: number;

    @IsNotEmpty({ message: 'Profile info should not be empty' })
    @IsString({ message: 'Profile info must be a string' })
    profileInfo!: string;

    @IsNotEmpty({ message: 'First name should not be empty' })
    @IsString({ message: 'First name must be a string' })
    firstName!: string;

    @IsNotEmpty({ message: 'Last name should not be empty' })
    @IsString({ message: 'Last name must be a string' })
    lastName!: string;
}

export class UpdateEmployeeCabinetDto {
    @IsOptional()
    @IsString({ message: 'Profile info must be a string' })
    profileInfo?: string;

    @IsOptional()
    @IsString({ message: 'First name must be a string' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'Last name must be a string' })
    lastName?: string;
} 