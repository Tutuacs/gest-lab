import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipamentTypeDto } from './dto/create-equipament-type.dto';
import { UpdateEquipamentTypeDto } from './dto/update-equipament-type.dto';
import { EquipamentTypeFunctionsService } from './functions/equipament-type-functions.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EquipamentTypeService {

  constructor(private readonly prisma: EquipamentTypeFunctionsService) { }

  async create(createEquipamentTypeDto: CreateEquipamentTypeDto) {

    const exist = await this.prisma.existName(createEquipamentTypeDto.name);
    if (exist) {
      throw new ConflictException(`EquipamentType with name ${createEquipamentTypeDto.name} already exists.`);
    }

    return await this.prisma.create(createEquipamentTypeDto);
  }

  async findAll({ skip, take }: { skip?: number, take?: number } = {}) {
    return this.prisma.list({ skip, take });
  }

  async findOne(id: number) {

    const exist = this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EquipamentType with id ${id} does not exist.`);
    }

    return this.prisma.find(id);
  }

  update(id: number, updateEquipamentTypeDto: UpdateEquipamentTypeDto) {

    const exist = this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EquipamentType with id ${id} does not exist.`);
    }

    if (updateEquipamentTypeDto.name) {
      const canUpdate = this.prisma.canUpdate(id, updateEquipamentTypeDto.name);

      if (!canUpdate) {
        throw new ConflictException(`EquipamentType with name ${updateEquipamentTypeDto.name} already exists.`);
      }

    }

    return this.prisma.update(id, updateEquipamentTypeDto);
  }

  remove(id: number) {

    const exist = this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EquipamentType with id ${id} does not exist.`);
    }

    return this.prisma.delete(id);

  }
}
