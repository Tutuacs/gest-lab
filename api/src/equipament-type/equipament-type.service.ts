import { Injectable } from '@nestjs/common';
import { CreateEquipamentTypeDto } from './dto/create-equipament-type.dto';
import { UpdateEquipamentTypeDto } from './dto/update-equipament-type.dto';

@Injectable()
export class EquipamentTypeService {
  create(createEquipamentTypeDto: CreateEquipamentTypeDto) {
    return 'This action adds a new equipamentType';
  }

  findAll() {
    return `This action returns all equipamentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipamentType`;
  }

  update(id: number, updateEquipamentTypeDto: UpdateEquipamentTypeDto) {
    return `This action updates a #${id} equipamentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipamentType`;
  }
}
