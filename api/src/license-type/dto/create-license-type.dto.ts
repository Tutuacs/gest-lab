import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateLicenseTypeDto {

        @ApiProperty({
                description: 'The name of the license type, must be unique and between 1 and 50 characters long.',
                example: 'Standard License',
                minLength: 1,
                maxLength: 50,
                required: true,
                type: String,
                uniqueItems: true,
        })
        @IsString()
        @Length(1, 50)
        name: string;

        @ApiPropertyOptional({
                default: "",
                description: 'A brief description of the license type, can be empty.',
                example: 'Standard license for basic usage',
                required: false,
        })
        @IsOptional()
        @IsString()
        description: string = "";

        @ApiProperty({
                description: 'The ID of the equipment type to which this license type is related.',
                type: Number,
                required: true,
                minimum: 1,
                example: 1,
        })
        @IsNumber()
        @Min(1)
        equipamentTypeId: number;

}
