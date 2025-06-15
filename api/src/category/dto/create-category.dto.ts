import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Contains, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateCertifiedDto {

    @ApiPropertyOptional({
        required: false,
        description: 'Description of the certified type',
        example: 'Faixa de atuação 10, 20, 30, 40, 50, 60, 70, 80, 90; Renovação a cada 1 ano.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Recebe valor em anos para a renovação, exemplo: 1 e faz a conversão para dias: 1 * 365.',
        example: '1',
        required: true,
    })
    @IsNumber()
    renovateInDays: number;

}

export class CreateCategoryDto {

    @ApiProperty({
        description: 'Nome da categoria',
        example: 'Pipetas',
        required: true,
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        required: false,
        description: 'Descrição da categoria',
        example: 'Categoria de equipamentos de laboratório para medição de líquidos.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        required: true,
    })
    @IsObject({ always: true, each: true })
    certifiedType: CreateCertifiedDto;

    @ApiProperty({
        description: 'Lista de marcas associadas à categoria',
        example: 'Paralela, MarcaX, MarcaY',
        required: true,
    })
    @IsOptional()
    @IsString()
    brands: string = "Paralela,";

}