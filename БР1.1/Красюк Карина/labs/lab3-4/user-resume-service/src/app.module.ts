import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ResumeModule } from './resume/resume.module';

import { EducationModule } from './education/education.module';
import { ApplicationModule } from './application/application.module';
import {WorkExperiencesModule} from "./workExperiences/workExperiences.module";

@Module({
    imports: [
        UsersModule,
        ResumeModule,
        WorkExperiencesModule,
        EducationModule,
        ApplicationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}