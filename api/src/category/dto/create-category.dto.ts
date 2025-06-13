import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: true })
    @IsObject({always: true, each: true})
    certifiedType: CreateCertifiedDto;

}

export class CreateCertifiedDto {

    @ApiPropertyOptional({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNumber()
    renovateInDays: number;

}
