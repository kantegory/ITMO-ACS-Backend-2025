
import { Repository } from "typeorm";
import { User } from "../entity/User";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}
  async findAll() {
    const user = await this.userRepository.find();
    return { 'status': 200, 'data': user, message: "Users found"  };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return { 'status': 404, 'data': null, message: "User not found" }
    }
    return { 'status': 200, 'data': user, message: "User found" };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { 'status': 404, 'data': null, message: "User not found" }
    }
    return { 'status': 200, 'data': {"password": user.password}, message: "User found" };
  }

  async createUser(newuser: User) {
    try {
        const check_user = await this.findByEmail(newuser.email);
        if (check_user['status'] === 200) {
          return { 'status': 409, 'data': null, 'message': 'Email is already registred' }
        }
        const user = this.userRepository.create(newuser);
        const savedUser = await this.userRepository.save(user);
        return { 'status': 201, 'data': savedUser, 'message': 'Successfully created' };
    } 
    catch (error) {
        console.error("Error during user creation:", error); 

        return { 'status': 500, 'data': newuser.email, 'message': 'Wrong Parameters' };
    }
  }

  async updateUser(id: number, data: Partial<User>) {
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
    } else {
      return { 'status': 404, 'data': null, message: "User not found" };
    }
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      await this.userRepository.remove(user);
      return { 'status': 200, 'message': "User Deleted successfully" };
    } else {
      return { 'status': 404, 'message': "User not found" };
    }
  }

}