import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';

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