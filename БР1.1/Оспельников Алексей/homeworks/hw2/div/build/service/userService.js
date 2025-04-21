"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findOne(id) {
        const users = await this.userRepository.findOne({ where: { id } });
        return users;
    }
    async findByEmail(email) {
        const users = await this.userRepository.findOne({ where: { email } });
        return users;
    }
    async createUser(newuser) {
        const user = this.userRepository.create(newuser);
        await this.userRepository.save(user);
        return user;
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            this.userRepository.merge(user, data);
            await this.userRepository.save(user);
            return user;
        }
        else {
            return { message: "User not found" };
        }
    }
    async delete(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            await this.userRepository.remove(user);
            return { message: "User Deleted successfully" };
        }
        else {
            return { message: "User not found" };
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map