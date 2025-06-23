import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOne({
      where: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.first_name = first_name;
    user.last_name = last_name;

    await userRepository.save(user);

    // Create token
    const token = jwt.sign(
      { userId: user.UserID },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          UserID: user.UserID,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.UserID },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: {
          UserID: user.UserID,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ['UserID', 'username', 'email', 'first_name', 'last_name', 'is_active']
    });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({
      where: { UserID: parseInt(id) },
      select: ['UserID', 'username', 'email', 'first_name', 'last_name', 'is_active']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 