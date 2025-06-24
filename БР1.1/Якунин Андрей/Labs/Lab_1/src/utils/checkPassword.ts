import bcrypt from 'bcrypt';

const checkPassword = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

export default checkPassword;
