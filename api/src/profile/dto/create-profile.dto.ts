import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from "@prisma/client";
import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {

//     model Profile {
//     id          String    @id @default(uuid())
//     name        String?
//     email       String    @unique
//     password    String
//     periodicity Int       @default(30)
//     role        ROLE      @default(USER)
//     Location    Location? @relation(fields: [locationId], references: [id])
//     locationId  Int?
// }

    @ApiProperty({
        description: 'Name of the profile',
        example: 'João da Silva',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email of the profile',
        example: 'joao@gmail.com',
        required: true,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the profile',
        example: 'senha123',
        required: true,
        minLength: 3,
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Validation periodicity in days',
        example: 30,
        required: true,
    })
    @IsNumber()
    periodicity: number;

    @ApiProperty({
        description: 'Role of the profile',
        enum: ROLE,
        example: ROLE.USER,
        required: true,
    })
    @IsEnum(ROLE)
    role: ROLE;

    @ApiProperty({
        description: 'Location ID where the profile is associated',
        example: 1,
        required: false
    })
    @IsNumber()
    locationId: number;

}
