import { AuctionBrand, AuctionCategory } from '@prisma/client';
import {
  LocalizationEntity,
  PartialLocalizationEntity,
} from 'src/admin/entities/localization.entity';

export class CategoryEntity implements AuctionCategory {
  auction_category_id: number;
  title: string;
  locales: PartialLocalizationEntity[];
}
