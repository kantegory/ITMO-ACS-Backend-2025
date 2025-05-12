import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     JobCategoryOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Software Engineering"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateJobCategoryDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Marketing"
 *
 *     UpdateJobCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Digital Marketing"
 */

export class CreateJobCategoryDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;
}

export class UpdateJobCategoryDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;
} 