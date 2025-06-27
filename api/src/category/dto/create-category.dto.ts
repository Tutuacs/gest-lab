import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Contains, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

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
        description: 'Lista de marcas associadas à categoria',
        example: 'Paralela, MarcaX, MarcaY',
        required: true,
    })
    @IsOptional()
    @IsString()
    brands: string = "Paralela,";

}