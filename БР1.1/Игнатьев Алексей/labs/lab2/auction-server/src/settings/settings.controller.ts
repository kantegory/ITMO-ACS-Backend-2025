import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { UpdateSettingsDto } from './dto/settings.dto';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsEntity } from './entities/settings.entity';
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('spin-cost')
  async getSpinCost(): Promise<SettingsEntity> {
    return await this.settingsService.getSpinCost();
  }

  @UseGuards(BasicAuthGuard)
  @ApiBearerAuth('Basic')
  @Patch('spin-cost')
  async updateSpinCost(
    @Body() body: UpdateSettingsDto,
  ): Promise<SettingsEntity> {
    return await this.settingsService.updateSpinCost(body.cost);
  }
}
