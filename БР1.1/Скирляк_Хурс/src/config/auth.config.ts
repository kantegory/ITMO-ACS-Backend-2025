import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export default registerAs('auth', (): { jwt: JwtConfig } => ({
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRATION || '1d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
}));
