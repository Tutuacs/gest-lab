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

}