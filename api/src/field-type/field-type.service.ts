import { Injectable } from '@nestjs/common';
import { CreateFieldTypeDto } from './dto/create-field-type.dto';
import { UpdateFieldTypeDto } from './dto/update-field-type.dto';

@Injectable()
export class FieldTypeService {
  create(createFieldTypeDto: CreateFieldTypeDto) {
    return 'This action adds a new fieldType';
  }

  findAll() {
    return `This action returns all fieldType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldType`;
  }

  update(id: number, updateFieldTypeDto: UpdateFieldTypeDto) {
    return `This action updates a #${id} fieldType`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldType`;
  }
}
