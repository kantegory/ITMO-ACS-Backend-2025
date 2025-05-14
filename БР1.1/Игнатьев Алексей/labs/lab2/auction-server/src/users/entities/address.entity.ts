import { Address } from 'prisma/prisma-client';
import { ApiProperty } from '@nestjs/swagger';
export class AddressEntity implements Address {
  @ApiProperty({ description: 'ID адреса' })
  address_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({ description: 'Номер дома', required: false, type: String })
  house_number: string | null;
  @ApiProperty({ description: 'Улица', required: false, type: String })
  street: string | null;
  @ApiProperty({ description: 'Страна', required: false, type: String })
  country: string | null;
  @ApiProperty({ description: 'Город', required: false, type: String })
  city: string | null;
}
