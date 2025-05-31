import { UserAlias, UserAliasType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UserAliasEntity implements UserAlias {
  @ApiProperty({ description: 'ID алиаса' })
  user_alias_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({ description: 'Тип алиаса', enum: UserAliasType })
  alias_type: UserAliasType;
  @ApiProperty({ description: 'Значение' })
  value: string;
  @ApiProperty({ description: 'Доказательство' })
  proof: string;
}
