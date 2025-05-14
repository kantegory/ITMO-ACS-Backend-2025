import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { NewsEntity } from './entities/news.entity';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { LocalizationType, PrismaClient } from 'prisma/prisma-client';
import { StorageService } from 'src/config/s3/s3.service';
import { CreateNewsDto } from './dto/create-news.dto';

import {
  LocalizationEntity,
  NewsLocalizationEntity,
} from 'src/admin/entities/localization.entity';
import { NewsLocalizationDto } from 'src/admin/dto/localization.dto';

@Injectable()
export class NewsService {
  constructor(
    protected prisma: PrismaClient,
    private readonly s3Service: StorageService,
  ) {}
  async findAll(params: PaginateParams): Promise<NewsEntity[]> {
    const { skip = 0, take = 10 } = params;
    const news = await this.prisma.news.findMany({
      skip,
      take,
    });
    const newsIds = news.map((news) => news.news_id);
    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: { in: newsIds },
        type: {
          in: [LocalizationType.NEWS_TEXT, LocalizationType.NEWS_TITLE],
        },
      },
    });
    console.log(localizations);
    console.log(newsIds);
    return news.map((news) => {
      const filteredLocales = localizations.filter(
        (loc) => loc.reference_id === news.news_id,
      );
      console.log(filteredLocales);

      if (filteredLocales.length > 0) {
        const textLocale = filteredLocales.find(
          (loc) => loc.type === LocalizationType.NEWS_TEXT,
        )!;
        const titleLocale = filteredLocales.find(
          (loc) => loc.type === LocalizationType.NEWS_TITLE,
        )!;

        return {
          ...news,
          locales: [
            {
              locale_id: textLocale.locale_id,
              language: textLocale.language,
              text: textLocale.text,
              title: titleLocale.text,
            },
          ],
        };
      } else {
        return {
          ...news,
          locales: [],
        };
      }
    });
  }
  async findOne(id: number): Promise<NewsEntity | null> {
    const news = await this.prisma.news.findFirst({
      where: { news_id: id },
    });

    if (!news) throw new NotFoundException(`News with ID ${id} not found`);

    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: id,
        type: {
          in: [LocalizationType.NEWS_TEXT, LocalizationType.NEWS_TITLE],
        },
      },
    });

    const textLocale = localizations.find(
      (loc) => loc.type === LocalizationType.NEWS_TEXT,
    )!;
    const titleLocale = localizations.find(
      (loc) => loc.type === LocalizationType.NEWS_TITLE,
    )!;

    return {
      ...news,
      locales: [
        {
          locale_id: textLocale.locale_id,
          language: textLocale.language,
          text: textLocale.text,
          title: titleLocale.text,
        },
      ],
    };
  }
  async create(
    createDto: CreateNewsDto,
    image: Express.Multer.File | undefined,
  ): Promise<NewsEntity> {
    const localesArray = JSON.parse(createDto.locales as unknown as string);

    console.log(localesArray);
    return await this.prisma.$transaction(async (tx) => {
      let img: string | null = null;
      if (image) {
        img = await this.s3Service.uploadFile(image);
      }
      const news = await tx.news.create({
        data: {
          text: createDto.text,
          title: createDto.title,
          image_url: img,
        },
      });
      const localizations: NewsLocalizationEntity[] = await Promise.all(
        localesArray.map(async (locale: NewsLocalizationDto) => {
          const localObjectText = await tx.localization.create({
            data: {
              reference_id: news.news_id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.NEWS_TEXT,
            },
          });
          const localObjectTitle = await tx.localization.create({
            data: {
              reference_id: news.news_id,
              language: locale.language,
              text: locale.title,
              type: LocalizationType.NEWS_TITLE,
            },
          });
          return {
            locale_id: localObjectText.locale_id,
            language: localObjectText.language,
            text: localObjectText.text,
            title: localObjectTitle.text,
          };
        }),
      );
      return {
        ...news,
        locales: localizations,
      };
    });
  }
  async update(
    id: number,
    updateDto: UpdateNewsDto,
    image?: Express.Multer.File,
  ): Promise<NewsEntity> {
    return await this.prisma.$transaction(async (tx) => {
      // Получаем текущие данные новости, включая изображение
      const updateLocales = JSON.parse(updateDto.locales as unknown as string);
      const existingNews = await tx.news.findUnique({
        where: { news_id: id },
        select: { image_url: true },
      });

      if (!existingNews) {
        throw new NotFoundException(`News with ID ${id} not found`);
      }

      // Обновляем изображение, если передано новое
      let img = existingNews.image_url;
      if (image) {
        if (img) {
          await this.s3Service.deleteFile(img);
        }
        img = await this.s3Service.uploadFile(image);
      }

      // Обновляем новость, только если переданы соответствующие поля
      const updatedNews = await tx.news.update({
        where: { news_id: id },
        data: {
          title: updateDto.title ?? undefined,
          text: updateDto.text ?? undefined,
          image_url: img,
        },
      });

      // Если локализации не переданы, возвращаем обновлённую новость
      if (!updateLocales) {
        const existingLocalizations = await tx.localization.findMany({
          where: {
            reference_id: id,
            type: {
              in: [LocalizationType.NEWS_TEXT, LocalizationType.NEWS_TITLE],
            },
          },
        });

        const groupedLocalizations = existingLocalizations.reduce<{
          [language: string]: NewsLocalizationEntity;
        }>((acc, loc) => {
          if (!acc[loc.language]) {
            acc[loc.language] = {
              locale_id: loc.locale_id,
              language: loc.language,
              text: '',
              title: '',
            };
          }
          if (loc.type === LocalizationType.NEWS_TEXT) {
            acc[loc.language].text = loc.text;
          } else if (loc.type === LocalizationType.NEWS_TITLE) {
            acc[loc.language].title = loc.text;
          }
          return acc;
        }, {});

        return {
          ...updatedNews,
          locales: Object.values(groupedLocalizations),
        };
      }

      // Удаляем только те локализации, которые были переданы для обновления
      await tx.localization.deleteMany({
        where: {
          reference_id: id,
          type: {
            in: [
              ...(updateLocales?.some((l) => l.text)
                ? [LocalizationType.NEWS_TEXT]
                : []),
              ...(updateLocales?.some((l) => l.title)
                ? [LocalizationType.NEWS_TITLE]
                : []),
            ],
          },
        },
      });

      // Создаём новые локализации только для переданных данных
      const newLocalizations = await Promise.all(
        updateLocales?.flatMap(async (locale: NewsLocalizationDto) => {
          let localTitle = '';
          let localText = '';
          let localId = 0;
          let localLanguage = '';
          const localizations: NewsLocalizationEntity[] = [];
          if (locale.text) {
            const localObject = await tx.localization.create({
              data: {
                reference_id: id,
                language: locale.language,
                text: locale.text,
                type: LocalizationType.NEWS_TEXT,
              },
              select: { text: true, locale_id: true, language: true },
            });
            localText = localObject.text;
            localId = localObject.locale_id;
            localLanguage = localObject.language;
          }

          if (locale.title) {
            const localObject = await tx.localization.create({
              data: {
                reference_id: id,
                language: locale.language,
                text: locale.title,
                type: LocalizationType.NEWS_TITLE,
              },
              select: { text: true },
            });
            localTitle = localObject.text;
          }
          localizations.push({
            locale_id: localId,
            language: localLanguage,
            title: localTitle,
            text: localText,
          });
          return localizations;
        }),
      );

      return { ...updatedNews, locales: newLocalizations.flat() };
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.news.delete({
          where: { news_id: id },
        });
        await tx.localization.deleteMany({
          where: {
            reference_id: id,
            type: {
              in: [LocalizationType.NEWS_TEXT, LocalizationType.NEWS_TITLE],
            },
          },
        });
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('News not found');
    }
  }
}
