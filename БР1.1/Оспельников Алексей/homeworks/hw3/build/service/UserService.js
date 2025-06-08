"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        const user = await this.userRepository.find();
        return { 'status': 200, 'data': user, message: "Users found" };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return { 'status': 404, 'data': null, message: "User not found" };
        }
        return { 'status': 200, 'data': user, message: "User found" };
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { 'status': 404, 'data': null, message: "User not found" };
        }
        return { 'status': 200, 'data': user, message: "User found" };
    }
    async createUser(newuser) {
        try {
            const user = this.userRepository.create(newuser);
            const savedUser = await this.userRepository.save(user);
            return { 'status': 201, 'data': savedUser, 'message': 'Successfully created' };
        }
        catch (error) {
            return { 'status': 500, 'data': null, 'message': 'Wrong Parameters' };
        }
    }
    async updateUser(id, data) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            try {
                this.userRepository.merge(user, data);
                const savedUser = await this.userRepository.save(user);
                return { 'status': 200, 'data': savedUser, message: 'Successfully updated' };
            }
            catch (error) {
                return { 'status': 500, 'data': null, message: 'Wrong Parameters' };
            }
        }
        else {
            return { 'status': 404, 'data': null, message: "User not found" };
        }
    }
    async delete(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            await this.userRepository.remove(user);
            return { 'status': 200, 'message': "User Deleted successfully" };
        }
        else {
            return { 'status': 404, 'message': "User not found" };
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map