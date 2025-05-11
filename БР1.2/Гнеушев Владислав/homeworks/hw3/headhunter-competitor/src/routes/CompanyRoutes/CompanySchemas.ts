import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CompanyOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *         employerId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateCompanyDto:
 *       type: object
 *       required:
 *         - name
 *         - employerId
 *       properties:
 *         name:
 *           type: string
 *           example: "New Company Ltd."
 *         employerId:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           nullable: true
 *           example: "A great place to work."
 *
 *     UpdateCompanyDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Updated Company Name"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "An even better place to work."
 */

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;

    @IsNotEmpty({ message: 'Employer ID should not be empty' })
    @IsNumber({}, { message: 'Employer ID must be an integer' })
    employerId!: number;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;
}

export class UpdateCompanyDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;
} 