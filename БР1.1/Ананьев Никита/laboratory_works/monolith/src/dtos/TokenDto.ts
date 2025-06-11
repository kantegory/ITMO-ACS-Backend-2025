import { IsJWT } from 'class-validator';

export class TokenDto {
    @IsJWT()
    jwt: string

    constructor(token: string){
        this.jwt = token
    } 
}
