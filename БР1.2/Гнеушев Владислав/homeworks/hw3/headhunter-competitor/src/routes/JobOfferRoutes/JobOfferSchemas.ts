import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     JobOfferOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Senior Software Engineer"
 *         description:
 *           type: string
 *           example: "Looking for an experienced software engineer..."
 *         companyId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateJobOfferDto:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - companyId
 *         - categoryId
 *       properties:
 *         title:
 *           type: string
 *           example: "Frontend Developer"
 *         description:
 *           type: string
 *           example: "We need a skilled frontend developer for our team."
 *         companyId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         requirements:
 *           type: string
 *           nullable: true
 *           example: "BSc in Computer Science"
 *         required_experience_months:
 *           type: integer
 *           nullable: true
 *           example: 24
 *         salary_from_rub:
 *           type: integer
 *           nullable: true
 *           example: 100000
 *         salary_to_rub:
 *           type: integer
 *           nullable: true
 *           example: 150000
 *         skillIds:
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 *           description: Optional. List of skill IDs to associate with the job offer.
 *           example: [1, 2, 3]
 *
 *     UpdateJobOfferDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Senior Frontend Developer"
 *         description:
 *           type: string
 *           example: "Updated job description for senior frontend developer."
 *         requirements:
 *           type: string
 *           nullable: true
 *           example: "MSc in Computer Science"
 *         required_experience_months:
 *           type: integer
 *           nullable: true
 *           example: 36
 *         salary_from_rub:
 *           type: integer
 *           nullable: true
 *           example: 120000
 *         salary_to_rub:
 *           type: integer
 *           nullable: true
 *           example: 180000
 *         is_active:
 *           type: boolean
 *           nullable: true
 *           example: false
 *         skillIds:
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 *           description: Optional. List of skill IDs to associate with the job offer. Will replace existing skills.
 *           example: [3, 4]
 */

export class CreateJobOfferDto {
    @IsNotEmpty({ message: 'Title should not be empty' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsNotEmpty({ message: 'Description should not be empty' })
    @IsString({ message: 'Description must be a string' })
    description!: string;

    @IsNotEmpty({ message: 'Company ID should not be empty' })
    @IsNumber({}, { message: 'Company ID must be an integer' })
    companyId!: number;

    @IsNotEmpty({ message: 'Category ID should not be empty' })
    @IsNumber({}, { message: 'Category ID must be an integer' })
    categoryId!: number;

    @IsOptional()
    @IsString({ message: 'Requirements must be a string' })
    requirements?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Required experience months must be an integer' })
    required_experience_months?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Salary from must be an integer' })
    salary_from_rub?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Salary to must be an integer' })
    salary_to_rub?: number;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be an integer' })
    skillIds?: number[];
}

export class UpdateJobOfferDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Requirements must be a string' })
    requirements?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Required experience months must be an integer' })
    required_experience_months?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Salary from must be an integer' })
    salary_from_rub?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Salary to must be an integer' })
    salary_to_rub?: number;

    @IsOptional()
    @IsBoolean({ message: 'Is active must be a boolean' })
    is_active?: boolean;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be an integer' })
    skillIds?: number[];
} 