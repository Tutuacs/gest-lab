import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, Min } from "class-validator";
import { ACTION, OBJECT, TYPE } from "src/common/event-type.enums";

export class ConnectEventTypeDto {

    @ApiProperty({
        enumName: 'ACTION',
        enum: ACTION,
        example: ACTION.ADD,
        required: true,
        description: 'The action should be "add" when you want to add a new relation or "remove".'
    })
    @IsEnum(ACTION)
    action: ACTION;
    
    @ApiProperty({
        enumName: 'TYPE',
        enum: TYPE,
        example: TYPE.ACTIVATE,
        required: true,
        description: 'The type of the relation, "activate" or "deactivate" the object'
    })
    @IsEnum(TYPE)
    type: TYPE;
    
    @ApiProperty({
        enumName: 'OBJECT',
        enum: OBJECT,
        example: OBJECT.LICENSE,
        required: true,
        description: 'The object type, for now only "license" is supported'
    })
    @IsEnum(OBJECT)
    object: OBJECT;
    
    @ApiProperty({
        description: 'The ID of the object to connect or disconnect',
        example: 1,
        required: true,
        minimum: 1,
        type: Number,
    })
    @IsNumber()
    @Min(1)
    objectId: number;

}