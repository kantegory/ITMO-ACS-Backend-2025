import bcrypt from 'bcryptjs';

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export default hashPassword;