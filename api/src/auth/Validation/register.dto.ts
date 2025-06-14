import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsStrongPassword, IsNumber, Min, Max, IsBase64, IsEmpty, IsEnum, } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123',
    required: true,
  })
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(ROLE)
  role: ROLE;

}
