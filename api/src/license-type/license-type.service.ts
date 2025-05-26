import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLicenseTypeDto } from './dto/create-license-type.dto';
import { UpdateLicenseTypeDto } from './dto/update-license-type.dto';
import { LicenseTypeFunctionsService } from './functions/license-type-functions.service';

@Injectable()
export class LicenseTypeService {

  constructor(private readonly prisma: LicenseTypeFunctionsService) {}

  async create(createLicenseTypeDto: CreateLicenseTypeDto) {

    const existCombination = await this.prisma.existCombination(
      createLicenseTypeDto.name,
      createLicenseTypeDto.equipamentTypeId,
    );

    if (existCombination) {
      throw new ConflictException(`LicenseType with name ${createLicenseTypeDto.name} already exists.`);
    }

    return this.prisma.create(createLicenseTypeDto);
  }

  findAll({skip, take}: { skip?: number, take?: number } = {}) {
    return this.prisma.list({ skip, take });
  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new ConflictException(`LicenseType with id ${id} does not exist.`);
    }

    return this.prisma.find(id);
  }

  async update(id: number, updateLicenseTypeDto: UpdateLicenseTypeDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new ConflictException(`LicenseType with id ${id} does not exist.`);
    }

    if (updateLicenseTypeDto.name) {
      const canUpdate = this.prisma.canUpdate(id, updateLicenseTypeDto.name, updateLicenseTypeDto.equipamentTypeId!);

      if (!canUpdate) {
        throw new ConflictException(`LicenseType with name ${updateLicenseTypeDto.name} already exists.`);
      }
    }

    return this.prisma.update(id, updateLicenseTypeDto);
  }

  async remove(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new ConflictException(`LicenseType with id ${id} does not exist.`);
    }

    return this.prisma.delete(id);
  }
}
