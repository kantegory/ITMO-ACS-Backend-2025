import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name must be a string' })
    name!: string;

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