import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from "@prisma/client";
import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";

export class CreateProfileDto {

    @ApiProperty({
        description: 'The email of the user. Must be unique.',
        example: 'master@master.com',
        type: String,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The name of the user.',
        example: 'Master',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The password of the user. Must be strong.',
        example: 'StrongPassword123!',
        type: String,
        minLength: 3,
    })
    @IsString()
    @IsStrongPassword({
        minLength: 3,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    })
    password: string;

    @ApiProperty({
        description: 'The role of the user.',
        example: ROLE.USER,
        enum: ROLE,
        type: String,
    })
    @IsEnum(ROLE)
    role: ROLE;


}
