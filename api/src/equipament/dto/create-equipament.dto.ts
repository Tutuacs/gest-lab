import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EQUIPAMENT_STATUS } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEquipamentDto {

    @ApiProperty({
        description: 'Name of the equipment',
        example: 'Laptop Dell XPS 13'
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'Description of the equipment',
        example: 'A high-performance laptop with 16GB RAM and 512GB SSD',
        required: false
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Patrimony number of the equipment',
        example: '123456789',
        required: true
    })
    @IsString()
    patrimonio: string;

    @ApiProperty({
        description: 'Tag of the equipment',
        example: 'TAG-001',
        required: true
    })
    @IsString()
    tag: string;

    @ApiProperty({
        description: 'Brand of the equipment',
        example: 'Dell',
        required: true
    })
    @IsString()
    brand: string;

    @ApiProperty({
        description: 'Serie of the equipment',
        example: 'SN123456789',
        required: true
    })
    @IsString()
    serie: string;

    @ApiProperty({
        description: 'Location ID where the equipment is stored',
        example: 1,
        required: true
    })
    @IsNumber()
    locationId: number;

    @ApiProperty({
        description: 'Status of the equipment',
        enum: EQUIPAMENT_STATUS,
        example: EQUIPAMENT_STATUS.MAINTENANCE,
        required: true
    })
    @IsEnum(EQUIPAMENT_STATUS)
    status: EQUIPAMENT_STATUS;

    @ApiProperty({
        description: 'Category ID of the equipment',
        example: 1,
        required: true
    })
    @IsNumber()
    categoryId: number;

}
