import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateLicenseTypeDto {

        @ApiProperty()
        @IsString()
        @Length(1, 50)
        name: string;
    
        @ApiPropertyOptional({default: ""})
        @IsOptional()
        @IsString()
        description: string = "";

        @ApiProperty()
        @IsNumber()
        @Min(1)
        equipamentTypeId: number;

}
