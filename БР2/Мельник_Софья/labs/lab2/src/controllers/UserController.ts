import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';


const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdOrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    let user;
    if (email) {
      user = await userRepository.findOneBy({ email: String(email) });
    } else {
      user = await userRepository.findOneBy({ id: Number(id) });
    }

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto = plainToInstance(CreateUserDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
      res.status(400).json({ errors: errorMessages });
      return;
    }

    if (!dto.password) {
      res.status(400).json({ message: 'Password is required' });
      return;
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      birth_date: new Date(dto.birth_date),
      gender: dto.gender,
      weight: dto.weight,
      height: dto.height,
      registration_date: new Date(dto.registration_date),
      goal: dto.goal,
      experience_level: dto.experience_level,
    });

    const result = await userRepository.save(newUser);
    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.user?.userId !== Number(id)) {
      res.status(403).json({ message: 'Forbidden: You can update only your own profile' });
      return;
    }

    const dto = plainToInstance(UpdateUserDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
      res.status(400).json({ errors: errorMessages });
      return;
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.birth_date) dto.birth_date = new Date(dto.birth_date) as any;
    if (dto.registration_date) dto.registration_date = new Date(dto.registration_date) as any;

    await userRepository.update(id, dto);

    res.json({ message: 'User updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    // добавила во второй лабе проверку по айди ч тобы юзер удалял себя или изменял только себ
    if (req.user?.userId !== Number(id)) {
      res.status(403).json({ message: 'Forbidden: You can delete only your own profile' });
      return;
    }

    await userRepository.delete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};