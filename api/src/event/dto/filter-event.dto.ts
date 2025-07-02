import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { EVENT_TYPE } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListDto } from 'src/common/list.dto';

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

    @ApiPropertyOptional({ description: 'Type of event, e.g., maintenance, repair' })
    @IsOptional()
    @IsEnum(EVENT_TYPE)
    eventType?: EVENT_TYPE;

    @ApiPropertyOptional({ description: 'Order value for sorting events' })
    @IsOptional()
    @IsEnum(['desc', 'asc'])
    @IsString()
    orderValue?: 'desc' | 'asc';

    @ApiPropertyOptional({ description: 'Like Serie, Patrimony or Tag of the equipment' })
    @IsOptional()
    @IsString()
    search?: string;

}
