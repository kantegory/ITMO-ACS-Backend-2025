import { Module } from '@nestjs/common';
import {IndustryModule} from "./Industry/industry.module";


@Module({
    imports: [IndustryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}