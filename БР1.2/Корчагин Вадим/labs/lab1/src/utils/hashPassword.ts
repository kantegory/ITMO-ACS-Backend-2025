import * as bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
