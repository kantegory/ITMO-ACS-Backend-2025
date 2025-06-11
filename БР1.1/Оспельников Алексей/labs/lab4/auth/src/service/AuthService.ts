import "dotenv/config";
import { hash, verify } from 'argon2';


export class AuthService {
    private async hashPassword(password: string): Promise<string> {
        return hash(password);
    }
    
    async register(email: string, username: string, password: string) {
        let url = process.env.MAIN + 'api/users';
        let data = {
            "email": email,
            "username": username,
            "password": password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(await response.json());
        return 
    }

    async login(email: string, username: string, password: string): Promise<string | null> {
        let url = process.env.MAIN + 'api/email?';
        let key = process.env.SECRET_KEY;
        return '';
    }

    async verify(token: string): Promise<any> {

    }
}