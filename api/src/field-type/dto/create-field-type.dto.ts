import { ApiProperty } from "@nestjs/swagger";
import { FIELD_TYPES } from "@prisma/client";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateFieldTypeDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    equipamentTypeId: number;

    @ApiProperty({default: FIELD_TYPES.STRING})
    @IsEnum(FIELD_TYPES)
    type: FIELD_TYPES = FIELD_TYPES.STRING;

    @ApiProperty({default: false})
    @IsOptional()
    @IsBoolean()
    optional: boolean = false;

    @ApiProperty({default: ""})
    @IsString()
    max: string = "";

    @ApiProperty({default: ""})
    @IsString()
    min: string = "";

}
