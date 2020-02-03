import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class OrderListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['id', 'userId', 'amount', 'value', 'description'])
  @ApiProperty({ required: false, enum: ['id', 'userId', 'amount', 'value', 'description'] })
  public orderBy: string;
}
