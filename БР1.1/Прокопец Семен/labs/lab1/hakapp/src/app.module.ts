import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { WorkExperiencesModule } from './workExperiences/workExperiences.module';
import { JwtMiddleware} from './conception/middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {ResumeModule} from "./resume/resume.module";
import {IndustryModule} from "./Industry/industry.module";
import {EducationModule} from "./education/education.module";
import {CompanyModule} from "./company/company.module";
import {ApplicationModule} from "./application/application.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Глобальная конфигурация для всего приложения
    }),
    UsersModule,
    VacancyModule,
    WorkExperiencesModule,
    ResumeModule,
    IndustryModule,
    // EducationModule,
    //CompanyModule,
    //ApplicationModule,
    JwtModule.register({
      secret: 'secret', // Замените на ваш секретный ключ
      signOptions: { expiresIn: '1h' }, // Время жизни токена
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(JwtMiddleware)
        .forRoutes('company'); // Применяем JwtMiddleware ко всем остальным маршрутам
  }
}