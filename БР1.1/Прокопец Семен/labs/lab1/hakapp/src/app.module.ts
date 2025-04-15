import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {LoggerMiddleware} from "./conception/middleware";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('users')
  }
}
