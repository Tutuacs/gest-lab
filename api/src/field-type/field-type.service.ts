import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFieldTypeDto } from './dto/create-field-type.dto';
import { UpdateFieldTypeDto } from './dto/update-field-type.dto';
import { FieldTypeFunctionsService } from './functions/field-type-functions.service';

@Injectable()
export class FieldTypeService {

  constructor(private readonly prisma: FieldTypeFunctionsService) {}

  async create(createFieldTypeDto: CreateFieldTypeDto) {

    const existCombination = await this.prisma.existCombination(createFieldTypeDto.name, createFieldTypeDto.equipamentTypeId);
    if (existCombination) {
      throw new ConflictException(`FieldType with name ${createFieldTypeDto.name} already exists.`);
    }

    return this.prisma.create(createFieldTypeDto);
  }

  findAll({skip, take}: { skip?: number, take?: number } = {}) {
    return this.prisma.list({ skip, take });
  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new ConflictException(`FieldType with id ${id} does not exist.`);
    }
    return this.prisma.find(id);
  }

  update(id: number, updateFieldTypeDto: UpdateFieldTypeDto) {
    return `This action updates a #${id} fieldType`;
  }

  async remove(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new ConflictException(`FieldType with id ${id} does not exist.`);
    }

    return this.prisma.delete(id);
  }
}
