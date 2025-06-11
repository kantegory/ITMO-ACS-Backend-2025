import { IsString } from 'class-validator';

export class TokenDto {
    @IsString()
    jwt: string

    constructor(token: string){
        this.jwt = token
    } 
}
