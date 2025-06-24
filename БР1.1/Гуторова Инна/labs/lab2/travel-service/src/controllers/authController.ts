import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const {
      email,
      password,
      username,
      first_name,
      last_name,
      isAdmin = false,
    } = req.body;

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      email,
      username,
      hashed_password: hashedPassword,
      first_name,
      last_name,
      isAdmin,
    });

    await userRepository.save(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};



export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req: Request, res: Response): Promise<any> => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const userId = (req as any).userId; 
  
      if (!userId) {
        return res.status(400).json({ message: 'User not authenticated' });
      }
  
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.hashed_password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.hashed_password = hashedNewPassword;
  
      await userRepository.save(user);
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
