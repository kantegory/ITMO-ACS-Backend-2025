import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Role } from '../models/Role';
import {
    ValidationErrors,
    ValidationException,
    validateUsername,
    validateEmail,
    validatePassword,
} from '../utils/validation';
import {UpdateUserDTO} from "../dtos/user.dto";
import {Follower} from "../models/Follower";

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const followerRepository = AppDataSource.getRepository(Follower);

export const getAllUsers = async (): Promise<User[]> => {
    return userRepository.find({ relations: ['role'] });
};

export async function findUser(query: { id?: number; email?: string }): Promise<User | null> {
    if (query.id != null) {
        return userRepository.findOne({ where: { id: query.id }, relations: ['role'] });
    }
    if (query.email) {
        return userRepository.findOne({ where: { email: query.email }, relations: ['role'] });
    }
    return null;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return userRepository.findOne({ where: { email }, relations: ['role'] });
};

export const createUser = async (data: Partial<User>): Promise<User> => {
    const errors = new ValidationErrors();
    await validateUsername(data.username!, errors, userRepository);
    await validateEmail(data.email!, errors, userRepository);
    validatePassword(data.password!, errors);

    if (errors.isError) {
        throw new ValidationException(errors.errors);
    }

    const defaultRole = await roleRepository.findOne({ where: { isDefault: true } });
    if (!defaultRole) {
        throw new Error('Default role is not configured');
    }

    const user = userRepository.create({
        username: data.username!,
        email: data.email!,
        password: data.password!,
        firstName: data.firstName,
        lastName: data.lastName,
        photoUrl: data.photoUrl,
        role: defaultRole,
    });
    return userRepository.save(user);
};

export async function updateUser(
    id: number,
    updates: UpdateUserDTO
): Promise<User> {
    const user = await userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) {
        const e = new Error('User not found');
        throw e;
    }

    const errors = new ValidationErrors();
    if (updates.username) {
        await validateUsername(updates.username, errors, userRepository);
        const dup = await userRepository.findOne({ where: { username: updates.username } });
        if (dup && dup.id !== id) {
            errors.addError('username', 'Username already exists.');
        }
    }
    if (updates.email) {
        await validateEmail(updates.email, errors, userRepository);
        const dup = await userRepository.findOne({ where: { email: updates.email } });
        if (dup && dup.id !== id) {
            errors.addError('email', 'Email already registered.');
        }
    }

    if (errors.isError) {
        throw new ValidationException(errors.errors);
    }

    Object.assign(user, updates);
    return userRepository.save(user);
}

export const deleteUser = async (id: number): Promise<boolean> => {
    const result = await userRepository.delete(id);
    return result.affected! > 0;
};

export async function setUserSubscription(
    userId: number,
    targetId: number,
    subscribe: boolean
): Promise<void> {
    if (userId === targetId) {
        throw new Error("Cannot subscribe to self");
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    const target = await userRepository.findOne({ where: { id: targetId } });
    if (!target) {
        throw new Error('Target user not found');
    }

    const existing = await followerRepository.findOne({
        where: { user: { id: targetId }, follower: { id: userId } },
    });

    if (subscribe) {
        if (!existing) {
            await followerRepository.save(
                followerRepository.create({ user: target, follower: user })
            );
        }
    } else {
        if (existing) {
            await followerRepository.delete(existing.id);
        }
    }
}

export async function getFollowers(userId: number): Promise<User[]> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const followers = await followerRepository.find({
        where: { user: { id: userId } },
        relations: ['follower', 'follower.role'],
    });
    return followers.map(f => f.follower);
}

export async function getFollowing(userId: number): Promise<User[]> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const following = await followerRepository.find({
        where: { follower: { id: userId } },
        relations: ['user', 'user.role'],
    });
    return following.map(f => f.user);
}