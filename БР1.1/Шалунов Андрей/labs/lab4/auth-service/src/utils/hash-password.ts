import bcrypt from 'bcrypt'

export default function hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}