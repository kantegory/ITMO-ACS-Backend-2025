import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
    imports: [CompanyModule, VacancyModule],
})
export class AppModule {}