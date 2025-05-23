import { PartialType } from '@nestjs/swagger';
import { CreateEquipamentTypeDto } from './create-equipament-type.dto';

export class UpdateEquipamentTypeDto extends PartialType(CreateEquipamentTypeDto) {}
