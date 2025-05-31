import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { LocalizationType, PrismaClient } from 'prisma/prisma-client';
import { FaqEntity } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import {
  FaqLocalizationEntity,
  LocalizationEntity,
} from 'src/admin/entities/localization.entity';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService extends CommonService<FaqEntity> {
  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  async findAll(params: PaginateParams): Promise<FaqEntity[]> {
    const { skip = 0, take = 10 } = params;
    const faqs = await this.prisma.faq.findMany({
      skip,
      take,
    });
    const faqIds = faqs.map((faq) => faq.faq_id);
    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: { in: faqIds },
        type: {
          in: [LocalizationType.FAQ_ANSWER, LocalizationType.FAQ_QUESTION],
        },
      },
    });
    return faqs.map((faq) => {
      const filteredLocales = localizations.filter(
        (loc) => loc.reference_id === faq.faq_id,
      );
      if (filteredLocales.length > 0) {
        const answerLocale = filteredLocales.find(
          (loc) => loc.type === LocalizationType.FAQ_ANSWER,
        )!;
        const questionLocale = filteredLocales.find(
          (loc) => loc.type === LocalizationType.FAQ_QUESTION,
        )!;
        return {
          ...faq,
          locales: [
            {
              locale_id: answerLocale.locale_id,
              language: answerLocale.language,
              question: questionLocale.text,
              answer: answerLocale.text,
            },
          ],
        };
      } else {
        return {
          ...faq,
          locales: [],
        };
      }
    });
  }

  async findOne(id: number): Promise<FaqEntity | null> {
    const faq = await this.prisma.faq.findFirst({
      where: { faq_id: id },
    });

    if (!faq) throw new BadRequestException('Faq not found');

    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: id,
        type: {
          in: [LocalizationType.FAQ_ANSWER, LocalizationType.FAQ_QUESTION],
        },
      },
    });

    const answerLocale = localizations.find(
      (loc) => loc.type === LocalizationType.FAQ_ANSWER,
    )!;
    const questionLocale = localizations.find(
      (loc) => loc.type === LocalizationType.FAQ_QUESTION,
    )!;

    return {
      ...faq,
      locales: [
        {
          locale_id: answerLocale.locale_id,
          language: answerLocale.language,
          question: questionLocale.text,
          answer: answerLocale.text,
        },
      ],
    };
  }

  async create(createDto: CreateFaqDto): Promise<FaqEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const faq = await tx.faq.create({
        data: {
          question: createDto.question,
          answer: createDto.answer,
        },
      });
      const localizations: FaqLocalizationEntity[] = await Promise.all(
        createDto.locales.map(async (locale) => {
          const localObjectAnswer = await tx.localization.create({
            data: {
              reference_id: faq.faq_id,
              language: locale.language,
              text: locale.answer,
              type: LocalizationType.FAQ_ANSWER,
            },
          });
          const localObjectQuestion = await tx.localization.create({
            data: {
              reference_id: faq.faq_id,
              language: locale.language,
              text: locale.question,
              type: LocalizationType.FAQ_QUESTION,
            },
          });
          return {
            locale_id: localObjectAnswer.locale_id,
            language: localObjectAnswer.language,
            answer: localObjectAnswer.text,
            question: localObjectQuestion.text,
          };
        }),
      );
      return {
        ...faq,
        locales: localizations,
      };
    });
  }

  async update(id: number, updateDto: UpdateFaqDto): Promise<FaqEntity> {
    return await this.prisma.$transaction(async (tx) => {
      // Получаем текущие данные FAQ
      const existingFaq = await tx.faq.findUnique({
        where: { faq_id: id },
      });
      if (!existingFaq) {
        throw new NotFoundException(`FAQ with ID ${id} not found`);
      }
      const updatedFaq = await tx.faq.update({
        where: { faq_id: id },
        data: {
          question: updateDto.question ?? undefined,
          answer: updateDto.answer ?? undefined,
        },
      });

      // Если локализации не переданы, возвращаем обновлённое FAQ
      if (!updateDto.locales?.length) {
        const existingLocalizations = await tx.localization.findMany({
          where: {
            reference_id: id,
            type: {
              in: [LocalizationType.FAQ_ANSWER, LocalizationType.FAQ_QUESTION],
            },
          },
        });

        const groupedLocalizations = existingLocalizations.reduce<{
          [language: string]: FaqLocalizationEntity;
        }>((acc, loc) => {
          if (!acc[loc.language]) {
            acc[loc.language] = {
              locale_id: loc.locale_id,
              language: loc.language,
              question: '',
              answer: '',
            };
          }
          if (loc.type === LocalizationType.FAQ_ANSWER) {
            acc[loc.language].answer = loc.text;
          } else if (loc.type === LocalizationType.FAQ_QUESTION) {
            acc[loc.language].question = loc.text;
          }
          return acc;
        }, {});

        return {
          ...updatedFaq,
          locales: Object.values(groupedLocalizations),
        };
      }

      await tx.localization.deleteMany({
        where: {
          reference_id: id,
          type: {
            in: [
              ...(updateDto.locales.some((l) => l.question)
                ? [LocalizationType.FAQ_QUESTION]
                : []),
              ...(updateDto.locales.some((l) => l.answer)
                ? [LocalizationType.FAQ_ANSWER]
                : []),
            ],
          },
        },
      });

      const newLocalizations = await Promise.all(
        updateDto.locales.flatMap(async (locale) => {
          let localQuestion = '';
          let localAnswer = '';
          let localId = 0;
          let localLanguage = '';
          const localizations: FaqLocalizationEntity[] = [];
          if (locale.answer) {
            const localObject = await tx.localization.create({
              data: {
                reference_id: id,
                language: locale.language,
                text: locale.answer,
                type: LocalizationType.FAQ_ANSWER,
              },
              select: { text: true, locale_id: true, language: true },
            });
            localAnswer = localObject.text;
            localId = localObject.locale_id;
            localLanguage = localObject.language;
          }

          if (locale.question) {
            const localObject = await tx.localization.create({
              data: {
                reference_id: id,
                language: locale.language,
                text: locale.question,
                type: LocalizationType.FAQ_QUESTION,
              },
              select: { text: true },
            });
            localQuestion = localObject.text;
          }
          localizations.push({
            locale_id: localId,
            language: localLanguage,
            answer: localAnswer,
            question: localQuestion,
          });
          return localizations;
        }),
      );

      return { ...updatedFaq, locales: newLocalizations.flat() };
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await this.prisma.faq.delete({
          where: { faq_id: id },
        });
        await this.prisma.localization.deleteMany({
          where: {
            reference_id: id,
            type: {
              in: [LocalizationType.FAQ_ANSWER, LocalizationType.FAQ_QUESTION],
            },
          },
        });
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Faq not found');
    }
  }
}
