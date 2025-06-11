import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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