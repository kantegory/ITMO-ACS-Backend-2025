import {
  $Enums,
  Auction,
  AuctionImage,
  AuctionParticipant,
  Prisma,
  User,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { BrandEntity } from '../../admin/brands/entities/brand.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { CategoryEntity } from './category.entity';

class Count {
  @ApiProperty()
  auction_participants: number;
}
export class Category {
  @ApiProperty()
  auction_category_id: number;
  @ApiProperty()
  title: string;
}
export class Brand {
  @ApiProperty()
  auction_brand_id: number;
  @ApiProperty()
  title: string;
}

export class AuctionEntity {
  auction_id: number;
  @ApiProperty({ type: Category })
  category: Category | null;
  @ApiProperty({ type: Brand })
  brand?: Brand | null;
  @ApiProperty({ enum: $Enums.AuctionType })
  type: $Enums.AuctionType;
  @ApiProperty({ type: Number })
  rate_time: number | null;
  @ApiProperty({ type: Date })
  start_time: Date;
  @ApiProperty({ type: Date })
  end_time: Date | null;
  @ApiProperty({ type: Date })
  announce_time: Date;
  @ApiProperty({ type: String })
  color: string;
  @ApiProperty({ type: String })
  description: string | null;
  rate_step: number | null;
  auction_number: string | null;
  discount: string | null;
  max_participants: number | null;
  is_draft: boolean;
  @ApiProperty({ enum: $Enums.AuctionStatus })
  status: $Enums.AuctionStatus;
  title: string;
  @ApiProperty({ type: Number })
  start_price: number;
  @ApiProperty({ type: Number })
  end_price: number;
  @ApiProperty({ type: Number })
  reservation_price: number | null;
  created_at: Date;
  updated_at: Date;
  @ApiProperty({ enum: $Enums.AuctionState })
  state: $Enums.AuctionState;
  @ApiProperty()
  _count?: Count;
  auction_participants?: AuctionParticipantEntity[];
  reviews?: ReviewEntity[];
  images?: AuctionImageEntity[];
  in_favorites?: boolean;
  free_spin_amount?: number;
}

export class AuctionImageEntity implements AuctionImage {
  auction_id: number;
  auction_image_id: number;
  url: string;
}

export class AuctionParticipantEntity {
  auction_id: number;
  user_id: number;
  auction_participant_id: number;
  created_at: Date;
  @ApiProperty({ type: 'number' })
  rate: number | null;
  updated_at: Date;
  user: UserEntity;
}
