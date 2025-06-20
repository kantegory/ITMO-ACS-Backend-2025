import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserMsController } from './user.ms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController, UserMsController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
