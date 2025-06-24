import { Role } from '../enums/userRoles.enum';

export type JwtPayload = {
  sub: number;
  email: string;
  role: Role;
};
