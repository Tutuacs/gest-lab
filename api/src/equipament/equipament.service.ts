import { Injectable } from '@nestjs/common';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { EquipamentFunctionsService } from './functions/equipament-functions.service';

@Injectable()
export class EquipamentService {

  constructor(private readonly prisma: EquipamentFunctionsService) {}

  async create(createEquipamentDto: CreateEquipamentDto) {

    const { patrimonio, tag, serie } = createEquipamentDto;
    if (await this.prisma.existCombination(patrimonio, tag, serie)) {
      throw new Error('Equipament with this combination already exists');
    }

    return this.prisma.create(createEquipamentDto);
  }

  findAll({skip, take}: { skip?: number; take?: number }) {
    return this.prisma.list({skip, take});
  }

  findOne(id: number) {
    return this.prisma.find(id);
  }

  async update(id: number, updateEquipamentDto: UpdateEquipamentDto) {

    if (!await this.prisma.exist(id)) {
      throw new Error('Equipament not found');
    }

    if (!await this.prisma.canUpdate(id, updateEquipamentDto.patrimonio!, updateEquipamentDto.tag!, updateEquipamentDto.serie!)) {
      throw new Error('Equipament with this combination already exists');
    }

    return this.prisma.update(id, updateEquipamentDto);
  }

  remove(id: number) {
    return this.prisma.delete(id);
  }
}
