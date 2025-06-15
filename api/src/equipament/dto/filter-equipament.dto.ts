import { Query } from '@nestjs/common';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { EQUIPAMENT_STATUS } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListDto } from 'src/common/list.dto';

export class FilterEquipamentDto extends PartialType(ListDto) {

    @ApiPropertyOptional({ description: 'Category ID' })
    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @ApiPropertyOptional({ description: 'Location ID' })
    @IsOptional()
    @IsNumber()
    locationId?: number;

    @ApiPropertyOptional({
        description: 'Status of the equipment',
        enum: EQUIPAMENT_STATUS,
        example: EQUIPAMENT_STATUS.MAINTENANCE,
    })
    @IsOptional()
    @IsEnum(EQUIPAMENT_STATUS)
    status?: EQUIPAMENT_STATUS;

    @ApiPropertyOptional({ description: 'Brand of the equipment' })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiPropertyOptional({ description: 'Like Serie, Patrimony or Tag of the equipment' })
    @IsOptional()
    @IsString()
    search?: string;

}
