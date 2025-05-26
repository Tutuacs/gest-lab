import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateEquipamentTypeDto {

    @ApiProperty()
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({default: ""})
    @IsOptional()
    @IsString()
    description: string = "";

}
