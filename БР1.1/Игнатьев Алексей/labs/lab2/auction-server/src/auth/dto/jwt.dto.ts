import { IsNumber, IsString } from 'class-validator';

export class JwtUserPayloadDto {
  @IsNumber()
  id: number;
  @IsString()
  email: string;
}
