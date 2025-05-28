import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateEquipamentTypeDto {

    @ApiProperty({
        description: 'Nome do tipo de equipamento',
        default: 'Projetor',
        example: 'Projetor',
        maxLength: 50,
        minLength: 1,
        required: true,
    })
    @IsString()
    @Length(1, 50)
    name: string;

    @ApiProperty({
        description: 'Descrição do tipo de equipamento',
        default: "",
        example: 'Equipamento utilizado para projeção de imagens e vídeos',
        required: false,
    })
    @IsOptional()
    @IsString()
    description: string = "";

}
