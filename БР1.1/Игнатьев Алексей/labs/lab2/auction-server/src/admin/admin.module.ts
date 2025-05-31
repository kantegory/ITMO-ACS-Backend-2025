import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaClient } from '@prisma/client';
import { BrandsController } from './brands/brands.controller';
import { BrandsService } from './brands/brands.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  controllers: [AdminController, BrandsController, CategoriesController],
  providers: [AdminService, BrandsService, CategoriesService, PrismaClient],
})
export class AdminModule {}
