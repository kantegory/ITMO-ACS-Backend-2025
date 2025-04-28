import bcrypt from "bcryptjs";

export const hashString = async (str: string) => {
  return await bcrypt.hash(str, 10);
};

export const compare = async (str: string, hash: string) => {
  return await bcrypt.compare(str, hash);
};