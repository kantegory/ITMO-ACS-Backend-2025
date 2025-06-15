import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpModule} from "@nestjs/axios";
import {HealthController} from "./Health.controller";

@Module({
  imports: [HttpModule.register({}),],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
