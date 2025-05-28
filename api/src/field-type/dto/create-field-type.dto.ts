import { ApiProperty } from "@nestjs/swagger";
import { FIELD_TYPES } from "@prisma/client";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateFieldTypeDto {

    @ApiProperty({
        description: 'The name you want to add on the equipament type, like: Computer -> GPU, ',
        example: 'GPU',
        required: true,
        type: String,
        uniqueItems: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The ID of the equipament type to which this field type is related.',
        type: Number,
        required: true,
        minimum: 1,
        example: 1,
    })
    @IsNumber()
    @Min(1)
    equipamentTypeId: number;

    @ApiProperty({
        default: FIELD_TYPES.STRING,
        enumName: 'FIELD_TYPES',
        enum: FIELD_TYPES,
        description: 'The type of the field, can be STRING, NUMBER, BOOLEAN, DATE, or ENUM.',
        example: FIELD_TYPES.STRING,
    })
    @IsEnum(FIELD_TYPES)
    type: FIELD_TYPES = FIELD_TYPES.STRING;

    @ApiProperty({
        default: false,
        description: 'If true, the field is optional and can be left empty.',
        example: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    optional: boolean = false;

    @ApiProperty({
        default: "",
        required: false,
        description: `The default value for the field, if applicable(Only on "STRING", "DATE" && "NUMBER").`,
        example: "100",
    })
    @IsString()
    max: string = "";
    
    @ApiProperty({
        default: "",
        required: false,
        description: `The default value for the field, if applicable(Only on "STRING", "DATE" && "NUMBER").`,
        example: "10",
    })
    @IsString()
    min: string = "";

}
