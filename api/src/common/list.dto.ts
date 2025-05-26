import { IsOptional, IsNumberString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListDto {
  @ApiPropertyOptional({ description: 'Number of items to skip' })
  @IsOptional()
  @IsNumber()
  skip?: number;

  @ApiPropertyOptional({ description: 'Number of items to take' })
  @IsOptional()
  @IsNumber()
  take?: number;
}
