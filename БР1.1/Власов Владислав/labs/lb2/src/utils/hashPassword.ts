import bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(4));
};

export default hashPassword;