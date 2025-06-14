import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { EquipamentFunctionsService } from './functions/equipament-functions.service';
import { FilterEquipamentDto } from './dto/filter-equipament.dto';
import { EQUIPAMENT_STATUS } from '@prisma/client';

@Injectable()
export class EquipamentService {

  constructor(private readonly prisma: EquipamentFunctionsService) {}

  async create(createEquipamentDto: CreateEquipamentDto) {

    const { patrimonio, tag, serie } = createEquipamentDto;
    if (await this.prisma.existCombination(patrimonio, tag, serie)) {
      throw new ConflictException('Equipament with this combination already exists');
    }

    createEquipamentDto.status = EQUIPAMENT_STATUS.INACTIVE;

    return this.prisma.create(createEquipamentDto);
  }

  findAll(query: FilterEquipamentDto) {
    return this.prisma.list(query);
  }

  findOne(id: number) {
    return this.prisma.find(id);
  }

  async update(id: number, updateEquipamentDto: UpdateEquipamentDto) {

    if (!await this.prisma.exist(id)) {
      throw new NotFoundException('Equipament not found');
    }

    if (!await this.prisma.canUpdate(id, updateEquipamentDto.patrimonio!, updateEquipamentDto.tag!, updateEquipamentDto.serie!)) {
      throw new ConflictException('Equipament with this combination already exists');
    }

    return this.prisma.update(id, updateEquipamentDto);
  }

  remove(id: number) {
    return this.prisma.delete(id);
  }
}
