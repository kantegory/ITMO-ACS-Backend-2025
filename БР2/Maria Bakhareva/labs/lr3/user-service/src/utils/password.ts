import bcrypt from 'bcrypt';

export const hashPassword = (password: string, rounds: number): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(rounds));
};

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
