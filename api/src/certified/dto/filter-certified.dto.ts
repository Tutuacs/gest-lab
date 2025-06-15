import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CERTIFIED_STATUS } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ListDto } from 'src/common/list.dto';

export class FilterCertifiedDto extends PartialType(ListDto) {

    @ApiPropertyOptional({
        description: 'ID da categoria do certificado.',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @ApiPropertyOptional({
        description: 'ID da localização onde o certificado está armazenado.',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    locationId?: number;

    @ApiPropertyOptional({
        description: 'Selecione o status dos certificados.',
        enum: CERTIFIED_STATUS,
        example: CERTIFIED_STATUS.ACTIVE,
        required: false,
    })
    @IsOptional()
    @IsEnum(CERTIFIED_STATUS)
    status?: CERTIFIED_STATUS;

    @ApiPropertyOptional({
        description: 'Selecione a marca dos certificados.',
        required: false,
    })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiPropertyOptional({
        description: 'Selecione o período inicial para filtrar os certificados atualizados a partir desta data.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    updatedAtFrom?: Date;

    @ApiPropertyOptional({
        description: 'Selecione o período final para filtrar os certificados atualizados até esta data.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    updatedAtTo?: Date;

    @ApiPropertyOptional({
        description: 'O certificado deve estar dentro do período de validade selecionado.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    updateUntil?: Date;

}
