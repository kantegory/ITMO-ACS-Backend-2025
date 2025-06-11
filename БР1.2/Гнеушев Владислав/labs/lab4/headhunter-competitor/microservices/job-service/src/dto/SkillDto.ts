import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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