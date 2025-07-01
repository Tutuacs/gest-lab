import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EVENT_TYPE } from "@prisma/client";
import { IsBase64, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventDto {

    @ApiProperty({
        description: 'Description of the event',
        example: 'Calibração preventiva, encontrado erros nas faixas X, Y e Z'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Start date and time of the event',
        example: '2023-10-01T08:00:00Z'
    })
    @IsNotEmpty()
    @IsDateString()
    from: string;

    @ApiProperty({
        description: 'End date and time of the event',
        example: '2023-10-01T17:00:00Z'
    })
    @IsNotEmpty()
    @IsDateString()
    to: string;

    @ApiProperty({
        description: 'Type of the event',
        enum: EVENT_TYPE,
        example: EVENT_TYPE.CALIBRATION
    })
    @IsNotEmpty()
    @IsEnum(EVENT_TYPE)
    eventType: EVENT_TYPE;

    @ApiPropertyOptional({
        description: 'Value associated with the event, e.g., cost of maintenance',
        example: 1500.00
    })
    @IsOptional()
    @IsNumber()
    value: number;

    @ApiProperty({
        description: 'ID of the equipment associated with the event',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    equipamentId: number;

}
