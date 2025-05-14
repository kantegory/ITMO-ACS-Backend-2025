import { Type } from "class-transformer"
import { IsEmail, IsString } from "class-validator"

export class createUserDto
{
    @IsEmail()
    @Type(() => String)
    email?: string

    @IsString()
    @Type(() => String)
    name?: string

    @IsString()
    @Type(() => String)
    password?: string
}
