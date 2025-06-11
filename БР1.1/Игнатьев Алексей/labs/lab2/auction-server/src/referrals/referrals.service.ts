import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { ReferralEntity } from './entities/referral.entity';
import { CheckReferralCodeResponseDto } from './dto/check-code.dto';
import { RefInfoDto } from './dto/ref-info.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

@Injectable()
export class ReferralsService extends CommonService<ReferralEntity> {
  async checkRefCode(refCode: string): Promise<CheckReferralCodeResponseDto> {
    return {
      is_correct: Boolean(
        await this.prisma.user.findFirst({
          where: { referral_code: refCode },
        }),
      ),
    };
  }
  async findAll(
    params: PaginateParams,
    userId: number,
  ): Promise<ReferralEntity[]> {
    const { skip = 0, take = 10 } = params;

    const referrals = await this.prisma.referral.findMany({
      skip,
      take,
      where: { referred_by: userId },
      include: {
        user: true,
      },
    });

    if (!referrals) {
      throw new NotFoundException('User not found');
    }

    return referrals.map((ref) => ({
      referral_id: ref.id,
      username: ref.user.username,
      first_name: ref.user.first_name,
      last_name: ref.user.last_name,
      instagram: ref.user.instagram,
      avatar_url: ref.user.avatar_url,
      language: ref.user.language,
    }));
  }
}
