import * as bcrypt from 'bcryptjs';

export const checkPassword = (hashedPassword: string, password: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
