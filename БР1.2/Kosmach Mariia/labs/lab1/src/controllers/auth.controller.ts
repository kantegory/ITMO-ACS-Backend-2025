import { RequestHandler } from 'express';
import { UserEntity } from '../models/user.entity';
import jwt from 'jsonwebtoken';
import dataSource from '../config/data-source';
import hashPassword from "../utils/hash-password";
import checkPassword from "../utils/check-password";
import SETTINGS from "../config/settings";

class AuthController {
    private repository = dataSource.getRepository(UserEntity);

    register: RequestHandler = async (req, res, next) => {
        try {
            const { mail, password, firstName, lastName } = req.body;

            const existingUser = await this.repository.findOne({ where: { mail } });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }
            const hashedPassword = hashPassword(password)
            const newUser = await this.repository.save({
                mail,
                password: hashedPassword,
                firstName,
                lastName
            });
            const token = jwt.sign({ id: newUser.id }, SETTINGS.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            res.status(201).json({ user: newUser, token });
        } catch (err) {
            next(err);
        }
    };

    login: RequestHandler = async (req, res, next) => {
        try {
            const { mail, password } = req.body;
            const user = await this.repository.findOne({ where: { mail } });
            if (!user) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }
            const isPasswordValid = checkPassword(user.password, password)
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }
            const token = jwt.sign({ id: user.id }, SETTINGS.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            res.status(200).json({ user, token });
        } catch (err) {
            next(err);
        }
    };

    logout: RequestHandler = (req, res, next) => {
        res.status(200).json({ message: 'Successfully logged out' });
    };

    verifyToken: RequestHandler = async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(403).json({ message: 'No token provided' });
                return;
            }
            const decoded = jwt.verify(token, SETTINGS.JWT_SECRET_KEY);
            res.status(200).json({ message: 'Token is valid', decoded });
        } catch (err) {
            next(err);
        }
    };
}

export default new AuthController();
