import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateLocationDto {

    @ApiProperty({
        description: 'Nome do local',
        example: 'Sala de Informática',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Nome do responsável pelo local',
        example: 'João da Silva',
        required: true,
    })
    @IsString()
    sponsor: string;

    @ApiProperty({
        description: 'Email do responsável pelo local',
        example: 'joao.silva@example.com',
        required: true,
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Ramal de contato do responsável pelo local',
        example: '1234',
        required: true,
    })
    @IsString()
    ramal: string;

    @ApiProperty({
        description: 'Nome do bloco ou área',
        example: '71',
        required: true,
    })
    @IsString()
    block: string;

    @ApiProperty({
        description: 'Sala ou local específico dentro do bloco',
        example: '101',
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
