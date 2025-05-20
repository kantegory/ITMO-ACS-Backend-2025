import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     ResumeOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         employeeId:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Experienced professional with a background in..."
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateResumeDto:
 *       type: object
 *       required:
 *         - employeeId
 *         - content
 *       properties:
 *         employeeId:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "My resume content detailing skills and experience."
 *         skillIds: 
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 *           description: Optional. List of skill IDs to associate with the resume.
 *           example: [1, 2, 3]
 *
 *     UpdateResumeDto:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           example: "Updated resume content."
 *         skillIds: 
 *           type: array
 *           items:
 *             type: integer
 *           nullable: true
 *           description: Optional. List of skill IDs to associate with the resume. Will replace existing skills.
 *           example: [3, 4]
 */

export class CreateResumeDto {
    @IsNotEmpty({ message: 'Employee ID should not be empty' })
    @IsNumber({}, { message: 'Employee ID must be an integer' })
    employeeId!: number;

    @IsNotEmpty({ message: 'Content should not be empty' })
    @IsString({ message: 'Content must be a string' })
    content!: string;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be an integer' })
    skillIds?: number[];
}

export class UpdateResumeDto {
    @IsOptional()
    @IsString({ message: 'Content must be a string' })
    content?: string;

    @IsOptional()
    @IsArray({ message: 'Skill IDs must be an array' })
    @IsNumber({}, { each: true, message: 'Each skill ID must be an integer' })
    skillIds?: number[];
} 