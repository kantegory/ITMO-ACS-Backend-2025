import { ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from '../interfaces/token.interface';

export class TokenResponseDto implements TokenResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
