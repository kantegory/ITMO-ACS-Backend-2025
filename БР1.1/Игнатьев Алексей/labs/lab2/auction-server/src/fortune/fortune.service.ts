import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClient, SpinItem, SpinItemType, Prisma } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { StorageService } from 'src/config/s3/s3.service';
import { SpinItemEntity } from './entities/spin-item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { SetIsActiveDto } from './dto/is-active.dto';

@Injectable()
export class FortuneService extends CommonService<SpinItemEntity> {
  constructor(
    private readonly s3Service: StorageService,
    protected readonly prisma: PrismaClient,
  ) {
    super(prisma);
  }
  async findAll(params: PaginateParams): Promise<SpinItemEntity[]> {
    const { skip = 0, take = 10 } = params;
    return await this.prisma.spinItem.findMany({
      skip,
      take,
    });
  }

  async findOne(id: number): Promise<SpinItemEntity> {
    const item = await this.prisma.spinItem.findUnique({
      where: {
        spin_item_id: id,
      },
    });

    if (!item) {
      throw new NotFoundException(`Spin item with ID ${id} not found`);
    }

    return item;
  }
  async findActiveItems(params: PaginateParams): Promise<SpinItemEntity[]> {
    const { skip = 0, take = 10 } = params;
    return await this.prisma.spinItem.findMany({
      where: {
        is_active: true,
      },
      skip,
      take,
    });
  }
  async create(
    data: CreateItemDto,
    image?: Express.Multer.File,
  ): Promise<SpinItemEntity> {
    let img: string | null = null;
    if (image) {
      img = await this.s3Service.uploadFile(image);
    }
    const createData = {
      ...data,
      image_url: img,
    };
    try {
      return await this.prisma.spinItem.create({
        data: createData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException({
          message: 'Ошибка валидации данных',
          details: {
            error: error.message,
            data: createData,
          },
        });
      }
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    data: UpdateItemDto,
    image?: Express.Multer.File,
  ): Promise<SpinItemEntity> {
    const spinItem = await this.prisma.spinItem.findUnique({
      where: {
        spin_item_id: id,
      },
      select: {
        image_url: true,
      },
    });
    let img = spinItem?.image_url;
    if (image) {
      img = await this.s3Service.uploadFile(image);
      if (spinItem?.image_url) {
        await this.s3Service.deleteFile(spinItem.image_url);
      }
    }
    const updateData = {
      ...data,
      image_url: img,
    };
    try {
      return await this.prisma.spinItem.update({
        where: {
          spin_item_id: id,
        },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException({
          message: 'Ошибка валидации данных',
          details: {
            error: error.message,
            data: updateData,
            id: id,
          },
        });
      }
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<StatusOKDto> {
    const spinItem = await this.prisma.spinItem.findUnique({
      where: {
        spin_item_id: id,
      },
    });

    if (!spinItem) {
      throw new NotFoundException(`Spin item with ID ${id} not found`);
    }

    if (spinItem.image_url) {
      await this.s3Service.deleteFile(spinItem.image_url);
    }

    await this.prisma.spinItem.delete({
      where: {
        spin_item_id: id,
      },
    });
    return new StatusOKDto();
  }
  async setIsActive(data: SetIsActiveDto): Promise<StatusOKDto> {
    const items = await this.prisma.spinItem.findMany({
      where: { spin_item_id: { in: data.item_ids } },
    });
    if (items.length !== 8) {
      throw new BadRequestException('Invalid item IDs');
    }
    const probabilitySum = items.reduce(
      (sum, item) => sum + item.probability,
      0,
    );
    if (probabilitySum !== 1) {
      throw new BadRequestException('Invalid probability sum');
    } else {
      await this.prisma.spinItem.updateMany({
        data: {
          is_active: false,
        },
      });
      await this.prisma.spinItem.updateMany({
        where: { spin_item_id: { in: data.item_ids } },
        data: { is_active: true },
      });
    }
    return new StatusOKDto();
  }
  async spin(userId: number): Promise<SpinItemEntity> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.free_spin_amount <= 0) {
      const spinPrice = await this.getSpinPrice();
      if (user.rato_balance < spinPrice) {
        throw new BadRequestException('Not enough balance');
      }
      user.rato_balance -= spinPrice;
      await this.prisma.user.update({
        where: { user_id: userId },
        data: { rato_balance: user.rato_balance },
      });
    } else {
      await this.prisma.user.update({
        where: { user_id: userId },
        data: { free_spin_amount: { decrement: 1 } },
      });
    }
    const items = await this.prisma.spinItem.findMany({
      where: { is_active: true },
    });
    const random = Math.random();
    let closestItem = items[0];
    let minDiff = Math.abs(items[0].probability - random);

    for (const item of items) {
      const diff = Math.abs(item.probability - random);
      if (diff < minDiff) {
        minDiff = diff;
        closestItem = item;
      }
    }
    if (closestItem.type === SpinItemType.RATO) {
      user.rato_balance += closestItem.amount!;
      await this.prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { user_id: userId },
          data: { rato_balance: user.rato_balance },
        });
        await tx.fortuneWins.create({
          data: {
            user_id: userId,
            spin_item_id: closestItem.spin_item_id,
            is_received: true,
          },
        });
      });
    } else {
      await this.prisma.fortuneWins.create({
        data: {
          user_id: userId,
          spin_item_id: closestItem.spin_item_id,
          is_received: false,
        },
      });
    }
    return closestItem;
  }

  private async getSpinPrice(): Promise<number> {
    const settings = await this.prisma.settings.findUnique({
      where: { settings_id: 1 },
    });
    return settings!.cost_per_spin;
  }
}
