import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { CategoryEntity } from 'src/auctions/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  LocalizationEntity,
  PartialLocalizationEntity,
} from '../entities/localization.entity';
import { LocalizationType } from 'prisma/prisma-client';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

@Injectable()
export class CategoriesService extends CommonService<CategoryEntity> {
  async findAll(params: PaginateParams): Promise<CategoryEntity[]> {
    const { skip = 0, take = 10 } = params;
    const categories = await this.prisma.auctionCategory.findMany({
      skip,
      take,
    });

    const categoryIds = categories.map(
      (category) => category.auction_category_id,
    );
    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: { in: categoryIds },
        type: LocalizationType.CATEGORY_TITLE,
      },
      select: {
        locale_id: true,
        language: true,
        text: true,
        reference_id: true,
      },
    });

    return categories.map((category) => ({
      ...category,
      locales: localizations
        .filter((loc) => loc.reference_id === category.auction_category_id)
        .map(({ reference_id, ...rest }) => rest), // Убираем reference_id
    }));
  }
  async findOne(id: number): Promise<CategoryEntity | null> {
    const category = await this.prisma.auctionCategory.findFirst({
      where: { auction_category_id: id },
    });

    if (!category) return null;

    const locales = await this.prisma.localization.findMany({
      where: { reference_id: id, type: LocalizationType.CATEGORY_TITLE },
      select: { locale_id: true, language: true, text: true },
    });

    return { ...category, locales };
  }
  async create(createDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const auctionCategory = await this.prisma.auctionCategory.create({
        data: {
          title: createDto.title,
        },
      });
      const localizations: PartialLocalizationEntity[] = await Promise.all(
        createDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: auctionCategory.auction_category_id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.CATEGORY_TITLE,
            },
            select: { locale_id: true, text: true, language: true },
          }),
        ),
      );
      return {
        auction_category_id: auctionCategory.auction_category_id,
        title: auctionCategory.title,
        locales: localizations,
      };
    });
  }
  async update(
    id: number,
    updateDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.prisma.$transaction(async (tx) => {
      // Обновляем название бренда
      const updatedCategory = await tx.auctionCategory.update({
        where: { auction_category_id: id },
        data: { title: updateDto.title },
      });

      if (!updateDto.locales?.length) {
        const currentLocalizations = await tx.localization.findMany({
          where: { reference_id: id, type: LocalizationType.CATEGORY_TITLE },
          select: { locale_id: true, language: true, text: true },
        });
        return { ...updatedCategory, locales: currentLocalizations };
      }
      // Удаляем старые локализации
      await tx.localization.deleteMany({
        where: { reference_id: id, type: LocalizationType.CATEGORY_TITLE },
      });

      // Создаем новые локализации
      const newLocalizations = await Promise.all(
        updateDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.CATEGORY_TITLE,
            },
            select: { locale_id: true, language: true, text: true },
          }),
        ),
      );

      return { ...updatedCategory, locales: newLocalizations };
    });
  }
  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await this.prisma.auctionCategory.delete({
          where: { auction_category_id: id },
        });
        await this.prisma.localization.deleteMany({
          where: { reference_id: id, type: LocalizationType.CATEGORY_TITLE },
        });
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Category not found');
    }
  }
}
