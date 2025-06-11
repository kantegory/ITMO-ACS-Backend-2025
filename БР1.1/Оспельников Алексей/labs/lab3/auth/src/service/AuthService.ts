const jwt = require('jsonwebtoken');
const axios = require('axios'); 
const bcrypt = require('bcrypt');
import "dotenv/config";


export class AuthService {
    async generateToken(userId) {
        const JWT_SECRET = process.env.JWT_SECRET; 
        return jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' }); 
    }

    async register(req, res) {
        const { email, password } = req.body;
        const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
        try {
            const userCheckResponse = await axios.get(`${USER_SERVICE_URL}/find?email=${email}`);

            if (userCheckResponse.data.exists) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userCreateResponse = await axios.post(`${USER_SERVICE_URL}/users`, {
                email: email,
                passwordHash: hashedPassword,
            });

            const userId = userCreateResponse.data.id;

            const token = this.generateToken(userId);

            res.status(201).json({ token });

        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

        try {
            const userGetResponse = await axios.get(`${USER_SERVICE_URL}/find?email=${email}`);

            if (!userGetResponse.data) {
            return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = userGetResponse.data;
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = this.generateToken(user.id);

            res.json({ token });

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Login failed', error: error.message });
        }
    }
    verifyToken(req, res, next) {
        const JWT_SECRET = process.env.JWT_SECRET; 

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401); 
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); 
            }

            req.userId = user.userId; 
            next()
        });
    }

}