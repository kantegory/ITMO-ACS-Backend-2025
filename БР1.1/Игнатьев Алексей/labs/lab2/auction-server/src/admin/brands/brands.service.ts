import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { BrandEntity } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { LocalizationType } from 'prisma/prisma-client';
import { PartialLocalizationEntity } from '../entities/localization.entity';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

@Injectable()
export class BrandsService extends CommonService<BrandEntity> {
  async findAll(params: PaginateParams): Promise<BrandEntity[]> {
    const { skip = 0, take = 10 } = params;
    const brands = await this.prisma.auctionBrand.findMany({ skip, take });

    const brandIds = brands.map((brand) => brand.auction_brand_id);
    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: { in: brandIds },
        type: LocalizationType.BRAND_TITLE,
      },
      select: {
        locale_id: true,
        language: true,
        text: true,
        reference_id: true,
      },
    });

    return brands.map((brand) => ({
      ...brand,
      locales: localizations
        .filter((loc) => loc.reference_id === brand.auction_brand_id)
        .map(({ reference_id, ...rest }) => rest), // Убираем reference_id
    }));
  }
  async findOne(id: number): Promise<BrandEntity | null> {
    const brand = await this.prisma.auctionBrand.findFirst({
      where: { auction_brand_id: id },
    });

    if (!brand) return null;

    const locales = await this.prisma.localization.findMany({
      where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
      select: { locale_id: true, language: true, text: true },
    });

    return { ...brand, locales };
  }
  async create(createDto: CreateBrandDto): Promise<BrandEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const auctionBrand = await this.prisma.auctionBrand.create({
        data: {
          title: createDto.title,
        },
      });
      const localizations: PartialLocalizationEntity[] = await Promise.all(
        createDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: auctionBrand.auction_brand_id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.BRAND_TITLE,
            },
            select: { locale_id: true, language: true, text: true },
          }),
        ),
      );
      return {
        auction_brand_id: auctionBrand.auction_brand_id,
        title: auctionBrand.title,
        locales: localizations,
      };
    });
  }
  async update(id: number, updateDto: UpdateBrandDto): Promise<BrandEntity> {
    return await this.prisma.$transaction(async (tx) => {
      // Обновляем название бренда
      const updatedBrand = await tx.auctionBrand.update({
        where: { auction_brand_id: id },
        data: { title: updateDto.title },
      });

      if (!updateDto.locales?.length) {
        const currentLocalizations = await tx.localization.findMany({
          where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
          select: { locale_id: true, language: true, text: true },
        });
        return { ...updatedBrand, locales: currentLocalizations };
      }
      // Удаляем старые локализации
      await tx.localization.deleteMany({
        where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
      });

      // Создаем новые локализации
      const newLocalizations = await Promise.all(
        updateDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.BRAND_TITLE,
            },
            select: { locale_id: true, language: true, text: true },
          }),
        ),
      );

      return { ...updatedBrand, locales: newLocalizations };
    });
  }
  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await this.prisma.auctionBrand.delete({
          where: { auction_brand_id: id },
        });
        await this.prisma.localization.deleteMany({
          where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
        });
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Brand not found');
    }
  }
}
