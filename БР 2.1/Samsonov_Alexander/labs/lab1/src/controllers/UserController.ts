import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../models/User';
import { CrudController } from './CrudController';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware';

export class UserController extends CrudController<User> {
    constructor(
        private readonly userRepository: Repository<User>,
        exposedFields: (keyof User)[] = []
    ) {
        super(userRepository, exposedFields);
    }

    /**
     * Register a new user
     * @param req - Express request object
     * @param res - Express response object
     */
    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findOneBy({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = this.userRepository.create({
                name,
                email,
                password: hashedPassword
            });

            // Save user
            const savedUser = await this.userRepository.save(user);

            // Generate token
            const token = generateToken({ id: savedUser.id, email: savedUser.email });

            // Return user data and token
            const { password: _, ...userWithoutPassword } = savedUser;
            return res.status(201).json({
                user: userWithoutPassword,
                token
            });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    /**
     * Login a user
     * @param req - Express request object
     * @param res - Express response object
     */
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            // Find user with password
            const user = await this.userRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.email = :email', { email })
                .getOne();

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = generateToken({ id: user.id, email: user.email });

            // Return user data and token
            const { password: _, ...userWithoutPassword } = user;
            return res.json({
                user: userWithoutPassword,
                token
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    /**
     * Get a user by email
     * @param req - Express request object
     * @param res - Express response object
     */
    getUserByEmail = async (req: Request, res: Response) => {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            const user = await this.userRepository.findOneBy({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Error fetching user by email:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    /**
     * Get a user by ID - Override to add better error handling
     */
    getOne = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        try {
            const user = await this.userRepository.findOneBy({ id });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}
