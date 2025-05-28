import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateLocationDto {

    @ApiProperty({
        description: 'Nome do bloco ou área',
        example: 'Bloco 71',
        required: true,
    })
    @IsString()
    block: string;

    @ApiProperty({
        description: 'Sala ou local específico dentro do bloco',
        example: 'Sala 101',
        required: true,
    })
    @IsString()
    room: string;

    @ApiPropertyOptional({
        description: 'Descrição opcional do local',
        example: 'Sala de reuniões com capacidade para 20 pessoas',
        required: false,
        default: '',
    })
    @IsOptional()
    @IsString()
    description?: string = "";

}
