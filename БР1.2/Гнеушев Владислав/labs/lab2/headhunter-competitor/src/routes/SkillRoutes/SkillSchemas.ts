import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     SkillOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "TypeScript"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateSkillDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "JavaScript"
 *
 *     UpdateSkillDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Node.js"
 */

export class CreateSkillDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;
}

export class UpdateSkillDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;
} 