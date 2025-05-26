import { ApiProperty } from "@nestjs/swagger";
import { FIELD_TYPES } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateFieldTypeDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    equipamentTypeId: number;

    @ApiProperty({default: FIELD_TYPES.STRING})
    @IsEnum(FIELD_TYPES)
    type: FIELD_TYPES = FIELD_TYPES.STRING;

    @ApiProperty({default: false})
    optional: boolean = false;

    @ApiProperty({default: ""})
    @IsString()
    max: string = "";

    @ApiProperty({default: ""})
    @IsString()
    min: string = "";

}
