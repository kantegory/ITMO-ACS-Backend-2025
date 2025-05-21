import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SettingsEntity } from './entities/settings.entity';
@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaClient) {}

  async getSpinCost(): Promise<SettingsEntity> {
    const settings = await this.prisma.settings.findUnique({
      where: { settings_id: 1 },
      select: {
        cost_per_spin: true,
        settings_id: true,
      },
    });
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    return settings;
  }

  async updateSpinCost(cost: number) {
    return await this.prisma.settings.update({
      where: { settings_id: 1 },
      data: { cost_per_spin: cost },
    });
  }
}
