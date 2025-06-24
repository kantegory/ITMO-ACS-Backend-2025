import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     EmployerCabinetOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 123
 *         companyName:
 *           type: string
 *           example: "Tech Solutions Inc."
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateEmployerCabinetDto:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with this employer cabinet.
 *           example: 123
 *
 *     UpdateEmployerCabinetDto:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *           description: The updated name of the company (optional).
 *           example: "Innovate Global Ltd."
 */

export class CreateEmployerCabinetDto {
    @IsNotEmpty({ message: 'User ID should not be empty' })
    @IsNumber({}, { message: 'User ID must be a number' })
    userId!: number;
}

export class UpdateEmployerCabinetDto {
    @IsOptional()
    @IsString({ message: 'Company name must be a string' })
    companyName?: string; 
} 