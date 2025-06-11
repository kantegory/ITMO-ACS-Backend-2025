import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { ReferralEntity } from './entities/referral.entity';
import { commonControllerFactory } from 'src/common/common.controller-default';
import { CheckReferralCodeResponseDto } from './dto/check-code.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { RefInfoDto } from './dto/ref-info.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

const CommonController = commonControllerFactory<ReferralEntity>({
  entity: ReferralEntity,
});

@Controller('referrals')
export class ReferralsController extends CommonController {
  constructor(private readonly referralsService: ReferralsService) {
    super(referralsService);
  }

  @Get('check-code/:referralCode')
  async checkRefCode(
    @Param('referralCode') referralCode: string,
  ): Promise<CheckReferralCodeResponseDto> {
    return await this.referralsService.checkRefCode(referralCode);
  }
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() req: { user: JwtUserPayloadDto },
    @Query() params: PaginateParams,
  ): Promise<ReferralEntity[]> {
    return await this.referralsService.findAll(params, req.user.id);
  }
}
