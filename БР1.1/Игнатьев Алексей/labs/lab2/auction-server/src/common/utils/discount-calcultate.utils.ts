import { BadRequestException } from '@nestjs/common';

export function calculateDiscount(
  start_price: number,
  end_price: number,
): string {
  if (start_price <= 0) {
    throw new BadRequestException('Start price must be greater than zero');
  }

  const discount = ((start_price - end_price) / start_price) * 100;
  return `${discount}%`;
}
