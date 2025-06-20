"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const User_1 = require("../entities/User");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
class UserService {
    static async register(data) {
        const userRepo = databaseConfig_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepo.findOneBy({ email: data.email });
        if (existingUser)
            throw new Error('User already exists');
        const user = userRepo.create({
            ...data,
            password: (0, password_1.hashPassword)(data.password, 10),
        });
        return userRepo.save(user);
    }
    static async login(email, password) {
        const userRepo = databaseConfig_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOneBy({ email });
        if (!user)
            throw new Error('User not found');
        if (!(0, password_1.comparePassword)(password, user.password)) {
            throw new Error('Invalid password');
        }
        const token = (0, jwt_1.signJwt)({ userId: user.id, role: user.role });
        return { user, token };
    }
    static async changePassword(id, password) {
        const userRepo = databaseConfig_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOneBy({ id });
        if (!user)
            throw new Error('User not found');
        user.password = (0, password_1.hashPassword)(password, 10);
        return userRepo.save(user);
    }
}
exports.UserService = UserService;
