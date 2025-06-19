import bcrypt from 'bcryptjs';

const checkPassword = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
};

export default checkPassword;