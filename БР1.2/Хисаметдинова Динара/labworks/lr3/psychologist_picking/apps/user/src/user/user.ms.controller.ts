import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../user/user.service';

@Controller()
export class UserMsController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(userId: number) {
    return this.userService.findById(userId);
  }
}
