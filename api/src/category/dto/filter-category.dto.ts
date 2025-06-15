import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ListDto } from 'src/common/list.dto';

export class FilterCategoryDto extends PartialType(ListDto) {

    @ApiProperty({
        description: 'Search Name or Description of the category',
        example: 'Pipeta',
        required: false,
    })
    @IsOptional()
    @IsString()     
    search?: string;

}
