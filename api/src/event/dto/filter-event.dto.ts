import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { EVENT_TYPE } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListDto } from 'src/common/list.dto';

export enum ORDER_DIRECTION {
  ASC = 'asc',
  DESC = 'desc'
}

export class FilterEventDto extends PartialType(ListDto) {

  @ApiPropertyOptional({ description: 'Equipment ID associated with the event' })
  @IsOptional()
  @IsNumber()
  equipamentId?: number;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Start date for filtering events' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date for filtering events' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Type of event', enum: EVENT_TYPE })
  @IsOptional()
  @IsEnum(EVENT_TYPE)
  eventType?: EVENT_TYPE;

  @ApiPropertyOptional({ description: 'Order value for sorting events', enum: ORDER_DIRECTION })
  @IsOptional()
  @IsEnum(ORDER_DIRECTION)
  orderValue?: ORDER_DIRECTION;

  @ApiPropertyOptional({ description: 'Search term' })
  @IsOptional()
  @IsString()
  search?: string;

}