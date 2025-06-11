import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UserDto {
    @IsNumber()
    id?: number

    @IsString()
    email!: string

    @IsString()
    firstName!: string

    @IsOptional()
    @IsString()
    lastName: string | undefined

    @IsDateString()
    birthDate!: Date

    constructor(init?: Partial<UserDto>) {
        Object.assign(this, init);
    }
}