import bcrypt from 'bcrypt'

export default function checkPassword(
    hashed: string,
    password: string
): boolean {
    return bcrypt.compareSync(password, hashed)
}