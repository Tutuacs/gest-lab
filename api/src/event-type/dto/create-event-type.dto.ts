import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EQUIPAMENT_STATUS } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, Length, Min, MinLength } from "class-validator";

export class CreateEventTypeDto {

    @ApiProperty({
        description: 'The name of the event type, must be unique and between 1 and 100 characters long.',
        example: 'Maintenance',
        minLength: 1,
        maxLength: 100,
        required: true,
        type: String,
        uniqueItems: true,
    })
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty({
        description: 'A brief description of the event type, must be at least 1 character long.',
        example: 'Scheduled maintenance for equipment',
        minLength: 1,
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(1)
    description: string;

    @ApiProperty({
        enumName: 'EQUIPAMENT_TYPE',
        description: 'The ID of the equipment type to which this event type is related.',
        type: Number,
        required: true,
        minimum: 1,
        example: 1,
    })
    @IsNumber()
    @Min(1)
    equipamentTypeId: number;

    @ApiPropertyOptional({
        enumName: 'EQUIPAMENT_STATUS',
        required: false,
        enum: EQUIPAMENT_STATUS,
    })
    @IsOptional()
    @IsEnum(EQUIPAMENT_STATUS)
    changeEquipamentStatusTo: EQUIPAMENT_STATUS;
}
