import bcrypt from 'bcrypt';

const checkPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export default checkPassword;
