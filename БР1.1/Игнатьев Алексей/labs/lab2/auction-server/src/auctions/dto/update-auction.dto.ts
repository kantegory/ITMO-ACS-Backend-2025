import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAuctionDto } from './create-auction.dto';
import { Transform } from 'class-transformer';
import { $Enums } from 'prisma/prisma-client';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {}
